import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDto";

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
