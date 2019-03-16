export class Utils {

// tslint:disable-next-line: max-line-length
    public static pushNotiBaseUrl: string = !!Utils.isLocalHost() ? "http://localhost:8080/" : "https://push-notification-api-test.herokuapp.com/";

    public static userInfoInLocalStorage: string = 'userInfo';

    public static getCurrentUrl(): string {
        return window.location.href;
    }

    public static isLocalHost() {
        return this.getBaseDomainName() === 'localhost' ? true : false;
    }

    public static getBaseDomainName() {
        return this.getCurrentUrl().split('/')[2].split(':')[0];
    }
}