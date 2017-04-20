declare interface IRecentSitesStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  SearchConfigGroup: string;
  SearchResultCount: string;
}

declare module 'recentSitesStrings' {
  const strings: IRecentSitesStrings;
  export = strings;
}
