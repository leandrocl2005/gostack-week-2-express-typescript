import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDto";

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
