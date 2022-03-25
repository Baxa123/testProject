import {Pipe, PipeTransform} from '@angular/core';
import {StructuralSubdivision} from "../model/structural-subdivision";

@Pipe({
  name: 'StructuralSubdivision'
})
export class StructuralSubdivisionPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case StructuralSubdivision.HEAD:
        return "Глава";
      case StructuralSubdivision.SUB_HEAD:
        return  "Заместитель главы";
      case StructuralSubdivision.WORKER:
        return  "Работник";
    }
    return "Not found";
  }

}
