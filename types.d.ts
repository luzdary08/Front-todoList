
export interface statusType{
    _id:string,
    name:string
  }

  export type statusModalType = null | 'add' | 'edit' | 'remove'


  export interface TaskType{
    description:string,
    status:string,
    completed:boolean
  }