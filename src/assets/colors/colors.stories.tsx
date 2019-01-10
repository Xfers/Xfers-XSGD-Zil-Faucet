import * as React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import chaptersAddon from 'react-storybook-addon-chapters';

const colors = {
  white: '#ffffff',
  gray100: '#f9f9fc',
  gray200: '#e9e9f4',
  gray300: '#dadfed',
  gray500: '#7c7d8c',
  gray700: '#353545',
  black: '#131520',

  blue500: '#3740ff',
  blue700: '#2d23a5',
  blue800: '#383f6e',

  green500: '#0aff00',
  green700: '#1bba6a',

  yellow500: '#f5d158',
  yellow700: '#d19200',

  red500: '#e2051a',
  red700: '#be032a'
};

const keyList = Object.keys(colors);
const getStyle = (key) => ({
  backgroundColor: colors[key],
  width: 60,
  height: 60,
  borderRadius: 50,
  margin: 10
});

const sectionOptionsNoProps = {
  showSource: false,
  showPropTables: false,
  allowPropTablesToggling: false
};

setAddon(chaptersAddon);
storiesOf('Colors', module)
  // @ts-ignore
  .addWithChapters('Palette', {
    chapters: [
      {
        info: 'Use color variables. Kindly avoid using directly.',
        sections: [
          {
            sectionFn: () => (
              <div className="d-flex flex-wrap text-center">
                {keyList.map((key) => {
                  return (
                    <div key={key} className="mx-4">
                      <div style={getStyle(key)} />
                      <b>{key}</b>
                      <br />
                      <small>
                        <b>{colors[key]}</b>
                      </small>
                    </div>
                  );
                })}
              </div>
            ),
            options: sectionOptionsNoProps
          }
        ]
      }
    ]
  });
