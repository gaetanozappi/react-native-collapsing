# React Native: react-native-collapsing

[![github home](http://img.shields.io/npm/v/react-native-collapsing.svg?style=flat)](https://www.npmjs.com/package/react-native-collapsing)
[![github home](https://img.shields.io/badge/gaetanozappi-react--native--collapsing-blue.svg?style=flat)](https://github.com/gaetanozappi/react-native-collapsing)
[![github issues](https://img.shields.io/github/issues/gaetanozappi/react-native-collapsing.svg?style=flat)](https://github.com/gaetanozappi/react-native-collapsing/issues)

![PNG](screenshot/react-native-collapsing.png)

-   [Usage](#usage)
-   [License](#license)

## 📖 Getting started

`$ npm install react-native-collapsing --save`

## Usage

```javascript
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Collapsing from 'react-native-collapsing';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Collapsing
          selected={this.state.selected}
          title="Primo gruppo"
          background="#22252A"
          backgroundBarNormal="#2D3035"
          backgroundBarFocus="#2D3035"
          iconBarNameNormal="videogame-asset"
          iconBarNameFocus="book"
          iconBarColorNormal="#1194ff"
          iconBarColorFocus="#ffb600"
          textBarColorNormal="#1194ff"
          textBarColorFocus="#ffb600"
          iconBarSize={25}
          showOnStart={true}
          animateIconNameNormal="chevron-down"
          animateIconNameFocus="chevron-up"
          animateIconColorNormal="#1194ff"
          animateIconColorFocus="#ffb600"
          badgeText="100"
          badgeColor="#fff"
          badgeBackground="#1194ff"
          badgeRadius={4}
          badgeFunction={e => {
            return e > 99 ? '99+' : e;
          }}
          onPress={e => {
            this.setState({ selected: e.name });
            console.log('1)' + this.state.selected);
          }}
          menu={[
            {
              type: 'menu',
              name: 'sub0',
              title: 'Home page',
              icon: 'home',
              colorText: '#fff',
              colorTextFocus: '#f2a307',
              colorIcon: '#c1c1c1',
              colorIconFocus: '#0480CB',
              background: 'transparent',
              backgroundFocus: '#1E2125',
              badgeText: '1000',
              badgeColor: '#fff',
              badgeBackground: '#1194ff',
              badgeRadius: 4,
            },
            {
              type: 'menu',
              name: 'sub1',
              title: 'Book',
              icon: 'book',
              colorText: '#fff',
              colorTextFocus: '#f9041d',
              colorIcon: '#fff',
              colorIconFocus: '#f9041d',
              //background: '#1194ff',
              backgroundFocus: '#1E2125',
            },
            {
              type: 'menu',
              name: 'sub11',
              title: 'Movie',
              icon: 'film',
              colorText: '#fff',
              colorTextFocus: '#0480CB',
              colorIcon: '#fff',
              colorIconFocus: '#0480CB',
              //background: '#1194ff',
              backgroundFocus: '#1E2125',
            },
          ]}
        />
        <Collapsing
          selected={this.state.selected}
          iconBarNameNormal="videogame-asset"
          iconBarNameFocus="videogame-asset"
          iconBarColorNormal="#0480CB"
          title="Secondo gruppo"
          color="#4CAF50"
          showOnStart={false}
          animateIconNameNormal="chevron-down"
          animateIconNameFocus="chevron-up"
          onPress={e => {
            this.setState({ selected: e.name });
            console.log('2)' + this.state.selected);
          }}
          menu={[
            {
              type: 'menu',
              name: 'sub2',
              title: 'Movie',
              icon: 'home',
            },
            {
              type: 'menu',
              name: 'sub3',
              title: 'Tv',
              icon: 'film',
            },
          ]}
        />
        <Collapsing
          selected={this.state.selected}
          title="Terzo gruppo"
          showOnStart={true}
          onPress={e => {
            this.setState({ selected: e.name });
            console.log('2)' + this.state.selected);
          }}
          menu={[
            {
              type: 'menu',
              name: 'sub4',
              title: 'Theater',
            },
            {
              type: 'menu',
              name: 'sub5',
              title: 'Opera',
              icon: 'film',
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    marginTop: 24,
  },
});
```

## 💡 Props

| Prop              | Type       | Default | Note                                                                                                       |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `selected`       | `string`   |    | Indicates the selected item.
| `title`       | `string`   |    | Menu title.
| `background`       | `string`   |    | Menu background color.
| `backgroundBarNormal`       | `string`   |    | Background color of the menu title, when the menu is in normal state.
| `backgroundBarFocus`       | `string`   |    | Background color of the menu title, when the menu is in focus state.
| `iconBarNameNormal`       | `MaterialIcons`   |    | Menu name icon, when the menu is in normal state.
| `iconBarNameFocus`       | `MaterialIcons`   |    | Menu name icon, when the menu is in focus state.
| `iconBarColorNormal`       | `string`   |    |  Menu color icon, when the menu is in normal state.
| `iconBarColorFocus`       | `string`   |    |  Menu color icon, when the menu is in focus state.
| `iconBarSize`       | `number`   |    | Icon size.
| `textBarColorNormal`       | `string`   |    |  Menu color text, when the menu is in normal state.
| `textBarColorFocus`       | `string`   |    |  Menu color text, when the menu is in focus state.
| `showOnStart`       | `bool`   |  `false`  | Indicates whether the menu is normal or focus.
| `animateIconNameNormal`       | `FontAwesome`   |    | Menu name animate icon, when the menu is in normal state.
| `animateIconNameFocus`       | `FontAwesome`   |    | Menu name animate icon, when the menu is in focus state.
| `animateIconColorNormal`       | `string`   |    | Menu color animate icon, when the menu is in normal state.
| `animateIconSize`       | `number`   |    | Animated icon size.
| `iconBarSize`       | `number`   |    | Menu title icon, when the menu is in normal state.
| `badgeText`       | `string`   |    | Badge text.
| `badgeColor`       | `string`   |    | Color of the badge text.
| `badgeBackground`       | `string`   |    | Background color of the badge.
| `badgeRadius`       | `number`   |    | Badge radius.
| `badgeFunction`       | `function`   |    | Use in case you want to define a function, for the badgeText attribute.
| `onPress`       | `function`   |    | It is used to recover the pressure event.
| `rippleColor`       | `string`   |    | Ripple color.

## License
This library is provided under the Apache License.
