import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import * as jsonurl from 'json-url/dist/browser/json-url-single';
import { XmlFile } from '../data/xml-file';

@Injectable({
  providedIn: 'root',
})
export class EncodeService {
  constructor() {}

  encode(file: XmlFile): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.xmlToJson(file.xmlFileContent)
        .then((json: any) => {
          jsonurl('lzma')
            .compress(json)
            .then((result) => {
              resolve(result);
            });
        })
        .catch((err) => reject(err));
    });
  }

  decode(str: string): Promise<XmlFile> {
    return new Promise<XmlFile>((resolve, reject) => {
      jsonurl('lzma')
        .decompress(str)
        .then((json) => {
          const xml = this.jsonToXml(json);
          const ret = new XmlFile();
          ret.xmlFileContent = xml;
          resolve(ret);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private xmlToJson(xmlFileContent: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      xml2js.parseString(xmlFileContent, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private jsonToXml(json: any): string {
    const builder = new xml2js.Builder();
    return builder.buildObject(json);
  }
}
