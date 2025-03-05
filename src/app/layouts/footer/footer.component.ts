import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 // private readonly translateService=inject(TranslateService)
  private readonly myTranslateService=inject(MyTranslateService)



}
