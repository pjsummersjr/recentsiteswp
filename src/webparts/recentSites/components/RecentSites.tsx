import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'


import styles from './RecentSites.module.scss';
import { IRecentSitesProps, ISitesProps } from './IRecentSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPQuery } from '../lib/spsearchjs/SPX/SP.Query';
import { SPUtils } from '../SPUtils/SPUtils';

export interface IRecentSitesState {
  sites: any[];
}

export default class RecentSites extends React.Component<IRecentSitesProps, IRecentSitesState> {

  private tenantName: string;
  private baseQuery: string; 

  constructor(props: IRecentSitesProps) {
    super(props);

    this.tenantName = SPUtils.GetTenantNameFromUrl(this.props.spSite);
    this.baseQuery = "+AND+(contentclass:STS_Web+OR+contentclass:STS_Site)+-Path:https:%2f%2f" + this.tenantName + "-my.sharepoint.com%2f*";

    this.state = {
      sites:[]
    };
  }

  public componentWillMount(newprops){
    this._GetInitialSites();
  }

  private _GetInitialSites(): void {
    let queryStr: string = "*"; 
    
    this._GetSites(queryStr);
  }

  private _GetSites(query: string): void {

    if(query == null || query.length == 0){
      query = "*";
    }

    let spquery: SPQuery = new SPQuery(this.props.spSite);

    spquery.QueryText = query + this.baseQuery;
    spquery.Properties = "GraphQuery:ACTOR(ME)";
    spquery.RowLimit = this.props.siteHits;
    
    let queryreq = spquery.GetRequestString();

    this.props.searchClient.getSearchResults(queryreq).then((results) => {
      this.state.sites = results.data[0].items;
      this.setState(this.state);
    });
  }

  private _checkAndReset(query: string): void {
    if(query == null || query.length == 0){
      this._GetSites("*");
    }
  }

  public render(): React.ReactElement<IRecentSitesProps> {
    return (
      <div className={styles.recentSites}>
        <div className={styles.container}>
          <div className={`ms-Grid`}>
            <div className={`ms-Grid-row`}>
              <div className={`ms-Grid-col ms-u-md8 ms-fontSize-xl ${styles.header}`}>{this.props.title}</div>    
              <div className={`ms-Grid-col ms-u-md4`}>
                <SearchBox
                  labelText="Search sites"
                  onChange={ (newValue) => this._checkAndReset(newValue)}
                  onSearch={ (newValue) => this._GetSites(newValue) }
                />
              </div>          
            </div>
          </div>
          <Sites sites={this.state.sites} />
        </div>
      </div>
    );
  }
}

export interface ISitesState {
  sites: any[];
}

export class Sites extends React.Component<ISitesProps, ISitesState> {
  constructor(props: IRecentSitesProps){
    super(props);
    this.state = {
      sites: []
    }
  }

  public componentWillMount() {
    this.state.sites = this.props.sites;
    this.setState(this.state);
  }

  public render() : React.ReactElement<IRecentSitesProps> {
    return (
      <div className={`ms-Grid`}>
        {this.props.sites.map((item, i) => {
          return <div key={item.fields.DocId} className={`ms-Grid-row ${styles.SiteRow}`}>
                  <div className={`ms-Grid-col ms-u-lg1`}>
                    <span className={`ms-Icon ms-Icon--Group ${styles.SiteIcon}`} aria-hidden="true"></span>
                  </div>
                  <div className={`ms-Grid-col ms-u-lg11`}>
                    <div className={`ms-font-l`}><a href={item.fields.Path} className={`ms-fontColor-themeDarker ${styles.primaryLink}`}>{item.fields.Title}</a></div>
                    <div className={`ms-font-m ms-fontColor-neutralSecondary`}>{item.fields.HitHighlightedSummary}</div>
                  </div>
                </div>
        })}
      </div>

    );
  }

}
