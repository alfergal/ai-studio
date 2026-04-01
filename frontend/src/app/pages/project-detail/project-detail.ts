import { toSignal } from '@angular/core/rxjs-interop';

private route = inject(ActivatedRoute);

id = toSignal(
  this.route.paramMap,
  { initialValue: null }
);
