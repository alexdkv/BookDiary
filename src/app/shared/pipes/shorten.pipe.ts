import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'shortenDescription'
})
export class ShortenDescriptionPipe implements PipeTransform{
    transform(value: string) {
            if(value.length > 75){
                return `${value.substring(0, 75)}...`;
            }
            return value;
    }
}