import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'recentSitesStrings';
import RecentSites from './components/RecentSites';
import { IRecentSitesProps } from './components/IRecentSitesProps';
import { IRecentSitesWebPartProps } from './IRecentSitesWebPartProps';

export default class RecentSitesWebPart extends BaseClientSideWebPart<IRecentSitesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecentSitesProps > = React.createElement(
      RecentSites,
      {
        sites: []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
