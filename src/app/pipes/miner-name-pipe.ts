import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minerName',
})
export class MinerNamePipe implements PipeTransform {

  // 🧠 Diccionario de mineros conocidos
  minerNames: Record<string, string> = {
    '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97': 'Titan Builder',
    '0x396343362be2A4dA1cE0C1C210945346fb82Aa49': 'quasarbuilder',
    '0xdadB0d80178819F2319190D340ce9A924f783711': 'BuilderNet',
    '0x388C818CA8B9251b393131C08a736A67ccB19297': 'Lido: Execution Layer Rewards Vault',
  };

  transform(value: string): string {
    if (!value) return '';
    console.log(value);

    return this.minerNames[value] || value;
  }
}
