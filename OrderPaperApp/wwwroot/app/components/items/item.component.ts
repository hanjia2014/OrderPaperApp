import { AppSettings }  from '../../settings/app.settings';

export class ItemComponent {
    imagesPath: string = AppSettings.IMAGE_PATH;
    toggleId: string;
    findOption = (options: Array<any>, key: string): string => {
        var text = '';
        options.forEach(option => {
            if (option.id == key)
                text = option.text;
        });
        return text;
    }

    Guid = (): string => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4 = (): string => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}