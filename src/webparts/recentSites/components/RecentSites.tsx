import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox'


import styles from './RecentSites.module.scss';
import { IRecentSitesProps, ISitesProps } from './IRecentSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IRecentSitesState {
  sites: any[];
}

export default class RecentSites extends React.Component<IRecentSitesProps, IRecentSitesState> {

  constructor(props: IRecentSitesProps) {
    super(props);

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
    this.props.searchClient.getSearchResults(query).then((results) => {
      this.state.sites = results.data[0].items;
      this.setState(this.state);
    });
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
                  onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
                  onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
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
