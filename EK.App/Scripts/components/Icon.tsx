/// <reference path="../typings/react/react-global.d.ts" />

namespace EK.UX {
    "use strict";

    export interface IIconTypeEnum {
        calendar: string;
        cancel: string;
        check: string;
        delete: string;
        magnifier: string;
        note: string;
        plus: string;
        refresh: string;
        save: string;
        search: string;
    };

    export var IconTypeEnum: IIconTypeEnum = {
        calendar: "fa fa-calendar",
        cancel: "glyphicon glyphicon-remove",
        check: "fa fa-check",
        delete: "glyphicon glyphicon-remove",
        magnifier: "icon-magnifier",
        note: "icon-note",
        plus: "fa fa-plus",
        refresh: "icon-refresh",
        save: "glyphicon glyphicon-floppy-disk",
        search: "fa fa-search"
    };

    interface IconProps extends React.Props<any> {
        icon?: string;
        type?: string;
        style?: React.CSSProperties;
    }

    export class Icon extends React.Component<IconProps, {}> {
        constructor(props: IconProps) {
            super(props);
        }

        render(): JSX.Element {
            let icon: string = this.props.icon;

            if (this.props.type !== undefined) {
                icon = this.props.type;
            };
            //console.log(this.props.style);
            return <i className={icon} style={this.props.style}></i>;
        }
    }
    export class IconAC extends React.Component<IconProps, {}> {
        constructor(props: IconProps) {
            super(props);
        }

        render(): JSX.Element {
            let icon: string = this.props.icon;

            if (this.props.type !== undefined) {
                icon = this.props.type;
            };
            //console.log(this.props.style,icon);
            return <i className={icon} style={this.props.style}></i>;
        }
    }
    //Iconos Css para KontrolFileManager.

    export interface IIconFileType {
        iconClass: string;
        allowed: RegExp;
    }

    export interface IIconFileTypeEnum {
        default: IIconFileType;
        excel: IIconFileType;
        pdf: IIconFileType;
        sound: IIconFileType;
        word: IIconFileType;
        archive: IIconFileType;
        image: IIconFileType;
        photo: IIconFileType;
        zip: IIconFileType;
        audio: IIconFileType;
        movie: IIconFileType;
        picture: IIconFileType;
        text: IIconFileType;
        code: IIconFileType;
        app: IIconFileType;
        powerpoint: IIconFileType;
        video: IIconFileType;
    }

    export var IconFileTypeEnum: IIconFileTypeEnum = {
        default: { iconClass: "fas fa-file", allowed: null },
        archive: { iconClass: "far fa-file-archive", allowed: null },
        audio: { iconClass: "far fa-file-audio", allowed: /audio.*/ },
        sound: { iconClass: "far fa-file-audio", allowed: /audio.*/ },
        movie: { iconClass: "far fa-file-movie", allowed: /video.*/ },
        picture: { iconClass: "far fa-file-image", allowed: /image.*/ },
        video: { iconClass: "far fa-file-video", allowed: /video.*/ },
        image: { iconClass: "far fa-file-image", allowed: /image.*/ },
        photo: { iconClass: "far fa-file-image", allowed: /image.*/ },
        app: { iconClass: "far fa-file", allowed: /application.*/ },
        text: { iconClass: "far fa-file-alt", allowed: /text.*/ },
        excel: { iconClass: "far fa-file-excel", allowed: /xls|xlsx|xlsm|xlsb|xla|xlam|xlt|xltm|xltx|xlw/gi },
        pdf: { iconClass: "far fa-file-pdf", allowed: /pdf/gi },
        word: { iconClass: "far fa-file-word", allowed: /doc|dot|wbk|docx|docm|dotx|dotm|docb/gi },
        zip: { iconClass: "far fa-file-archive", allowed: /gz|bz2|rar|zip|7z|gzip/gi },
        code: { iconClass: "far fa-file-code", allowed: /c|class|cpp|cs|css|dtd|fla|h|java|lua|m|pl|py|sh|sln|vb|vcxproj|asp|html|js|jsp|src/gi },
        powerpoint: { iconClass: "far fa-file-powerpoint", allowed: /ppt|pptx|pptm|potx|potm|ppam|ppsx|ppsm/gi }
    }
};

import IconTypeEnum = EK.UX.IconTypeEnum;
import IconFileTypeEnum = EK.UX.IconFileTypeEnum;