import { Router } from '@angular/router';

import { UserTypes } from '@app/shared';

export class RouteRedirector {
    constructor(public router: Router) {}

    redirectUserToDashboard(role: string) {
        switch (role) {
            case UserTypes.organizer:
                this.router.navigate(['/organizer/dashboard']);
                break;
            case UserTypes.participant:
                this.router.navigate(['/participant/dashboard']);
                break;
            case UserTypes.admin:
                this.router.navigate(['/admin/dashboard']);
                break;
            default:
                this.router.navigate(['/']);
        }
    }

    redirectToCompleteRegistrationPage(uid: string) {
        this.router.navigate(['/auth/complete-registration', uid]);
    }
}
