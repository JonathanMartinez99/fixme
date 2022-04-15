import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../../interfaces/producto';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(productos: Producto[], filterBy:string): Producto[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter ?
      productos.filter(p =>
        p.nombre.toLocaleLowerCase().includes(filter)):productos;
  }

}
