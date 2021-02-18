import {ToasterTypeModel} from './toaster-type.model';

export interface ToasterModel {
  title: string;
  text: string;
  type: ToasterTypeModel
}
