import * as React from 'react';
// @ts-ignore
import * as ReactUltimatePagination from 'react-ultimate-pagination';
import './pagination.scss'

function Page(props: any) {
    return (<li className={(props.isActive ? '' : 'scroll-to-top2') + (props.isDisabled ? ' disabled' : '')}>
        <a className={(props.isActive ? 'active p-item' : 'p-item')} onClick={props.onClick} data-page="0">{props.value}</a>
    </li>);
}

function Ellipsis(props: any) {
    return (<li onClick={props.onClick} className={"prev " + (props.isDisabled ? "disabled" : "")}>
        {props.isDisabled ? (<span>«</span>) : <a>...</a>}
    </li>);
}

function FirstPageLink(props: any) {
    return (<li onClick={props.onClick} className={"prev " + (props.isActive ? "disabled" : "scroll-to-top2")}>
        {props.isDisabled ? (<span>««</span>) : <a>«</a>}
    </li>);
}

function PreviousPageLink(props: any) {
    return (<li onClick={props.onClick} className={"prev " + (props.isActive ? "disabled" : "scroll-to-top2")}>
        {props.isDisabled ? (<span>«</span>) : <a className="control prev"> <img src="/assets/img/ll.png" /> <span> Пред. </span> </a>}
    </li>);
}

function NextPageLink(props: any) {
    return (<li onClick={props.onClick} className={"next " + (props.isActive ? "disabled" : "scroll-to-top2")}>
        {props.isDisabled ? (<span>»</span>) : <a className="control next"> <span> След. </span> <img src="/assets/img/rr.png" /></a>}
    </li>);
}

function LastPageLink(props: any) {
    return (<li onClick={props.onClick} className={"prev " + (props.isActive ? "disabled" : "scroll-to-top2")}>
        {props.isDisabled ? (<span>»»</span>) : <a>»</a>}
    </li>);
}

function Wrapper(props: any) {
    return <ul className="pagination m-pagination ">{props.children}</ul>
}

let itemTypeToComponent = {
    'PAGE': Page,
    'ELLIPSIS': Ellipsis,
    'FIRST_PAGE_LINK': FirstPageLink,
    'PREVIOUS_PAGE_LINK': PreviousPageLink,
    'NEXT_PAGE_LINK': NextPageLink,
    'LAST_PAGE_LINK': LastPageLink
};

let UltimatePagination = ReactUltimatePagination.createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper
});

interface IProps {
    currentPage: number,
    totalPages: number,
    onChange: any,
    className?: string
}

export default class Pagination extends React.Component<IProps, any>{

    render() {
        return (
            <div className={"pagination " + this.props.className}>
                <UltimatePagination hideFirstAndLastPageLinks
                    siblingPagesRange={2}
                    currentPage={this.props.currentPage}
                    onChange={this.props.onChange}
                    totalPages={this.props.totalPages} />
            </div>
        );
    }
}
