import { ISearchClient } from '../lib/spsearchjs/SPX/ISearch';;

export interface IRecentSitesProps {
  title: string;
  searchClient : ISearchClient;
  spSite: string;
  sites: any[];
  siteHits: number;
}

export interface ISitesProps {
  sites: any[];
}
