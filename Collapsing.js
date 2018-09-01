import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
const AnimatedIcon = Animatable.createAnimatableComponent(FontAwesome);

const RippleColor = (...args) =>
  Platform.Version >= 21 ? TouchableNativeFeedback.Ripple(...args) : null;

const Animations = {
  rotateTop: {
    0: {
      rotate: '0deg',
    },
    1: {
      rotate: '-180deg',
    },
  },
  rotateBottom: {
    0: {
      rotate: '0deg',
    },
    1: {
      rotate: '180deg',
    },
  },
};

export default class Collapsing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      show: props.showOnStart,
      selected: props.selected,
    };
  }

  /*static defaultProps = {
    showOnStart: false,
    icon: 'angle-right',
    iconOpened: 'minus',
    iconActive: 'plus',
    iconCollapsed: 'plus',
    tintColor: '#ccc',
    iconSize: 15,
  };*/

  componentWillReceiveProps = nextProps => {
    if (nextProps.selected != this.props.selected)
      this.setState({
        selected: nextProps.selected,
      });
  };

  componentWillMount() {
    const { fadeAnim } = this.state;
    Animated.parallel([Animated.timing(fadeAnim, { toValue: 1 })]).start(
      () => {}
    );
    Animatable.initializeRegistryWithDefinitions({
      rotateTop: Animations.rotateTop,
      rotateBottom: Animations.rotateBottom,
    });
  }

  componentDidMount() {
    const { show } = this.state;
    if (show) this.animatable.rotateTop(0);
    else this.animatable.rotateBottom(0);
  }

  toggleView = () => {
    const { show, iconCollapsed, iconOpened } = this.state;
    if (!show) this.animatable.rotateTop(0);
    else this.animatable.rotateBottom(0);
    this.setState({
      show: !show,
    });
  };

  badgeFunction = e => {
    return this.props.badgeFunction ? this.props.badgeFunction(e) : e;
  };

  backgroundBar() {
    const { backgroundBarNormal, backgroundBarFocus } = this.props;
    var normal = backgroundBarNormal ? backgroundBarNormal : '#ffffff';
    var focus = backgroundBarFocus ? backgroundBarFocus : 'transparent';
    return this.state.show ? focus : normal;
  }

  iconBarColor() {
    const { iconBarColorNormal, iconBarColorFocus } = this.props;
    var normal = iconBarColorNormal ? iconBarColorNormal : '#000000';
    var focus = iconBarColorFocus ? iconBarColorFocus : '#607D8B';
    return this.state.show ? focus : normal;
  }

  textBarColor() {
    const { textBarColorNormal, textBarColorFocus } = this.props;
    var normal = textBarColorNormal ? textBarColorNormal : '#000000';
    var focus = textBarColorFocus ? textBarColorFocus : '#607D8B';
    return this.state.show ? focus : normal;
  }

  colorIcon(el) {
    var colorIconFocus = el.colorIconFocus ? el.colorIconFocus : '#607D8B';
    var colorIcon = el.colorIcon ? el.colorIcon : '#000000';
    return this.state.selected == el.name ? colorIconFocus : colorIcon;
  }

  textColor(el) {
    var colorTextFocus = el.colorTextFocus ? el.colorTextFocus : '#607D8B';
    var colorText = el.colorText ? el.colorText : '#000000';
    return {
      color: this.state.selected == el.name ? colorTextFocus : colorText,
    };
  }

  viewBackground(el) {
    var backgroundFocus = el.backgroundFocus ? el.backgroundFocus : '#e8e8e8';
    var background = el.background ? el.background : 'transparent';
    return {
      backgroundColor:
        this.state.selected == el.name ? backgroundFocus : background,
    };
  }

  _selected = e => {
    this.setState({ selected: e.name });
    this.props.onPress(e);
  };

  renderCollapsible = () => {
    const {
      title,
      background,
      rippleColor,
      iconBarNameNormal,
      iconBarNameFocus,
      iconBarSize,
      animateIconNameNormal,
      animateIconNameFocus,
      animateIconColorNormal,
      animateIconColorFocus,
      badgeText,
      badgeColor,
      badgeBackground,
      badgeRadius,
      badgeStyle,
      animatedIconName,
      animateIconSize,
      menu,
    } = this.props;
    const { fadeAnim, show } = this.state;

    var backgroundView = background ? background : '#fff';
    var iconBar = !show ? iconBarNameNormal : iconBarNameFocus;

    var animateIcon = show ? animateIconNameFocus : animateIconNameNormal;
    var animateIconColor = show
      ? animateIconColorFocus
      : animateIconColorNormal;

    var iconViewBar = (
      <View
        style={{
          paddingLeft: 15,
        }}>
        <MaterialIcons
          name={iconBar}
          size={iconBarSize || 25}
          color={this.iconBarColor()}
        />
      </View>
    );

    var textBar = (
      <Text
        style={[
          styles.title,
          {
            color: this.textBarColor(),
          },
        ]}>
        {title}
      </Text>
    );

    var badgeCollapsing = (
      <Text
        style={[
          styles.badge,
          {
            color: badgeColor,
            backgroundColor: badgeBackground,
            borderRadius: badgeRadius,
          },
          badgeStyle,
        ]}>
        {this.badgeFunction(badgeText)}
      </Text>
    );

    var animateIconCollapsing = (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AnimatedIcon
          ref={ref => {
            this.animatable = ref;
          }}
          name={animateIcon}
          size={animateIconSize || 15}
          color={animateIconColor}
        />
      </View>
    );

    return (
      <View style={{ width: '100%', backgroundColor: backgroundView }}>
        <TouchableNativeFeedback
          onPress={this.toggleView}
          delayPressIn={0}
          delayPressOut={0}
          useForeground={true}
          background={RippleColor(rippleColor)}>
          <View style={[styles.bar, { backgroundColor: this.backgroundBar() }]}>
            {iconViewBar}
            {textBar}
            <View style={styles.viewBadge}>
              {badgeText && badgeCollapsing}
              {animateIconCollapsing}
            </View>
          </View>
        </TouchableNativeFeedback>
        {this.state.show && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {menu.map((u, io) => {
              var icon = (
                <View
                  style={{
                    paddingLeft: 30,
                  }}>
                  <FontAwesome
                    name={u.icon}
                    size={25}
                    color={this.colorIcon(u)}
                  />
                </View>
              );
              var titleList = (
                <View
                  style={{
                    paddingLeft: u.icon ? 15 : 30,
                  }}>
                  <Text
                    style={[
                      {
                        marginTop: 16,
                        marginBottom: 16,
                        fontSize: 13,
                        textAlign: 'left',
                        fontWeight: 'bold',
                      },
                      this.textColor(u),
                    ]}>
                    {u.title}
                  </Text>
                </View>
              );

              var badgeList = (
                <View style={styles.viewBadge}>
                  <Text
                    style={[
                      styles.badge,
                      {
                        color: u.badgeColor,
                        backgroundColor: u.badgeBackground,
                        borderRadius: u.badgeRadius,
                      },
                      u.badgeStyle,
                    ]}>
                    {this.badgeFunction(u.badgeText)}
                  </Text>
                </View>
              );
              return (
                <TouchableNativeFeedback
                  key={io}
                  onPress={this._selected.bind(this, u)}
                  delayPressIn={0}
                  delayPressOut={0}
                  useForeground={true}
                  background={RippleColor(u.rippleColor)}>
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                      this.viewBackground(u),
                    ]}>
                    {u.icon && icon}
                    {u.title && titleList}
                    {u.badgeText && badgeList}
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </Animated.View>
        )}
      </View>
    );
  };
  render() {
    return this.renderCollapsible();
  }
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    marginLeft: 15,
    fontSize: 13,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  viewBadge: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 5,
  },
  badge: {
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
