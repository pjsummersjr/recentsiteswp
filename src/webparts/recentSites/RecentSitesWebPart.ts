import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version,
          Environment,
          EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'recentSitesStrings';
import RecentSites from './components/RecentSites';
import { IRecentSitesProps } from './components/IRecentSitesProps';
import { IRecentSitesWebPartProps } from './IRecentSitesWebPartProps';

import { ISearchClient } from './lib/spsearchjs/SPX/ISearch';
import { SPSearchClient } from './lib/spsearchjs/SPX/SPX/SPSearchClient';
import { MockSPSearchClient } from './lib/spsearchjs/SPX/SPX/MockSPSearchClient';

export default class RecentSitesWebPart extends BaseClientSideWebPart<IRecentSitesWebPartProps> {

  private searchClient: ISearchClient;

  public onInit<T>(): Promise<T> {
    if(Environment.type == EnvironmentType.Local) {
      this.searchClient = new MockSPSearchClient();
    }
    else {
      this.searchClient = new SPSearchClient(this.context);
    }

    return Promise.resolve(null);
  }

  public render(): void {
    
    const element: React.ReactElement<IRecentSitesProps > = React.createElement(
      RecentSites,
      {
        sites: [],
        searchClient: this.searchClient,
        spSite: this.context.pageContext.site.absoluteUrl,
        title: this.properties.title,
        siteHits: this.properties.hitCount
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: "Recent Sites"
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.SearchConfigGroup,
              groupFields: [
                PropertyPaneTextField('hitCount', {
                  label: strings.SearchResultCount,
                  value: "10"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
