export type AreaListItem = {
  code: number,
  name: string,
  childs: AreaListItem[],
  is_selected: boolean,
  is_show: boolean,
};