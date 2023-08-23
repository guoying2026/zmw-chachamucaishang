export type Category = {
  id?: string,
  parentId?: string,
  name: string,
  childs?: Category[],
  isAlias: boolean,
}