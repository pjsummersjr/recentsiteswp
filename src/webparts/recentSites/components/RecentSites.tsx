import * as React from 'react';
import styles from './RecentSites.module.scss';
import { IRecentSitesProps } from './IRecentSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RecentSites extends React.Component<IRecentSitesProps, void> {
  public render(): React.ReactElement<IRecentSitesProps> {
    return (
      <div className={styles.recentSites}>
        <div className={styles.container}>
          <Sites sites={this.props.sites} />
        </div>
      </div>
    );
  }
}

export interface ISitesState {
  sites: any[];
}

export class Sites extends React.Component<IRecentSitesProps, ISitesState> {
  constructor(props: IRecentSitesProps){
    super(props);
  }

  public render() : React.ReactElement<IRecentSitesProps> {
    return (
      <div>Here are my sites</div>
    );
  }

}
