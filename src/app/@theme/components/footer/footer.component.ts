import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="https://www.oixxio.net/" target="_blank">OIXXIO</a></b> 2020</span>
    <div class="socials">
      <a href="https://es-la.facebook.com/oixxiotech/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/oixxiotech?lang=en" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/oixxio-technologies/?originalSubdomain=ar" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
