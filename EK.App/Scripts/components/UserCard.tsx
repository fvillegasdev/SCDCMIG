namespace EK.UX.UserCard {
    "use strict";
    interface IUserCardProps extends React.Props<any> {
        config?: page.IPageConfig;
        //data?: any;
        //entity?: DataElement;
        //entityType?: DataElement;
        //id?: string;
        //minTime?: string;
        //maxTime?: string;
        //onEventDataTransform?: (item: any) => void;
        //onEventClick?: (calEvent: any, jsEvent: any, view: any) => any;
        //onDayClick?: (date: any, jsEvent: any, view: any) => any;
        //onSelect?: (startDate: any, endDate: any) => any;
        //pageId?: string;
        //selectedItem?: any;
        //selectedItems?: any[];
        //slot?: string;
        //idForm?: any;
        //applyValuesControl?: any;
    };
    export class UserCard extends React.Component<IUserCardProps, IUserCardProps> {
        constructor(props: IDataTableProps) {
            super(props);
            //this.calendarInit = this.calendarInit.bind(this);
            //this.calendarDestroy = this.calendarDestroy.bind(this);
        };
        static defaultProps: IUserCardProps = {
        };
        //refs: {
        //    container: Element;
        //};
        //shouldComponentUpdate(nextProps: IDataTableProps, nextState: any): boolean {
        //    return hasChanged(this.props.data, nextProps.data);
        //};
        
        //componentDidMount(): void {
        //    this.calendarInit();
        //};
        //componentWillUnmount(): void {
        //    this.calendarDestroy();
        //};
        //componentWillUpdate(nextProps: IDataTableProps, nextState: any) {
        //    this.calendarDestroy();
        //};
        //componentDidUpdate(): void {
        //    this.calendarInit();
        //};
        render(): JSX.Element {
            return  <div style={{ marginTop: "15px", marginLeft: "15px", marginRight: "15px" }}>
                        <div className="kt-widget kt-widget--user-profile-1">
                            <div className="kt-widget__head">
                                <div className="kt-widget__media">
                                 <img alt="" title=""className={"img-circle-fixed"} src="KontrolFiles/GetFile/usuarios/143/images/637088533260165465" style={{ background: "beige", width: "150px", height: "150px", marginTop: "0px" }} />
                                
                </div>
                                    <div className="kt-widget__content">
                                        <div className="kt-widget__section">
                                            <a href="#" className="kt-widget__username">
                                                Jason Muller Mendez Abimael
                            <i className="flaticon2-correct kt-font-success"></i>
                                            </a>
                                            <span className="kt-widget__subtitle">
                                                Head of Development
                        </span>
                                        </div>

                                        <div className="kt-widget__action">
                                            <button type="button" className="btn btn-info btn-sm">chat</button>&nbsp;
                        <button type="button" className="btn btn-success btn-sm">follow</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="kt-widget__body">
                                    <div className="kt-widget__content">
                                        <div className="kt-widget__info">
                                            <span className="kt-widget__label">Email:</span>
                                            <a href="#" className="kt-widget__data">matt@fifestudios.com</a>
                                        </div>
                                        <div className="kt-widget__info">
                                            <span className="kt-widget__label">Phone:</span>
                                            <a href="#" className="kt-widget__data">44(76)34254578</a>
                                        </div>
                                        <div className="kt-widget__info">
                                            <span className="kt-widget__label">Location:</span>
                                            <span className="kt-widget__data">Melbourne</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                
                ;
        };
    };

    //export const GlobalCalendar: any = global.connect(class extends React.Component<IUserCardProps, IUserCardProps>{
    //    static props: any = (state: any) => ({
    //        data: state.global.calendario
    //    });
    //    onEventDataTransform(item: any): any {
    //        return {
    //            id: item.ID,
    //            //url: item.Link,
    //            ruta: item.Ruta,
    //            title: item.Summary,
    //            allDay: item.AllDay === true,
    //            start: item.DTStart,
    //            end: item.DTEnd,
    //            desc: item.Description,
    //            location: item.Location,
    //            textColor: item.TextColor ? item.TextColor : undefined,
    //            backgroundColor: item.BackgroundColor ? item.BackgroundColor : undefined,
    //        };
    //    };
    //    onEventClick(calEvent: any, jsEvent: any, view: any): any {
    //        global.goModal("modalDetalle", calEvent.ruta);
    //    };
    //    render(): JSX.Element {
    //        let data: DataElement;
    //        if (isSuccessful(this.props.data)) {
    //            data = global.createSuccessfulStoreObject(global.getData(this.props.data).Events);
    //            data.timestamp = this.props.data.timestamp;
    //            data.status = this.props.data.status;
    //        }
    //        else {
    //            data = this.props.data;
    //            data.data = global.getData(this.props.data);
    //        };
    //        return <div><UserCard {...this.props} data={data}
    //            onEventClick={this.onEventClick.bind(this)}
    //            onEventDataTransform={this.onEventDataTransform.bind(this)}></UserCard>
    //            <modal.Modal id="modalDetalle" url={"about:blank"}></modal.Modal></div>;
    //    };
    //});
    

    export const BasicUserCard: any = global.connect(class extends React.Component<IUserCardProps, IUserCardProps>{
        static props: any = (state: any) => ({
            data: state.global.WBSTareasSGPCalendar
        });
       

        render(): JSX.Element {
           

            return <UserCard {...this.props} >
                        
                </UserCard>;
        };
    });
};

import userCard = EK.UX.UserCard;