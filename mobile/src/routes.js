import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import HelpCenter from '~/pages/Help/HelpCenter/';
import Question from '~/pages/Help/Question';
import NewQuestion from '~/pages/Help/NewQuestion';

import Header from '~/components/Header';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createStackNavigator({
          Home: {
            screen: createBottomTabNavigator(
              {
                CheckIn,
                Help: {
                  screen: createStackNavigator(
                    {
                      HelpCenter,
                      Question,
                      NewQuestion,
                    },
                    {
                      initialRouteName: 'HelpCenter',
                      defaultNavigationOptions: {
                        headerLeft: null,
                        headerTransparent: true,
                      },
                    }
                  ),
                  navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="help" size={20} color={tintColor} />
                    ),
                  },
                },
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#000',
                  inactiveTintColor: '#666',
                  labelStyle: {
                    fontSize: 14,
                  },
                  style: {
                    backgroundColor: '#fff',
                    marginBottom: 10,
                  },
                },
              }
            ),
            navigationOptions: {
              headerTitle: <Header />,
            },
          },
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'SignIn',
      }
    )
  );
