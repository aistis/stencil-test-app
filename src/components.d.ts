/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface CategoryLanding {
    }
    interface PageHeadline {
        "text": String;
    }
    interface ProductList {
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLCategoryLandingElement extends Components.CategoryLanding, HTMLStencilElement {
    }
    var HTMLCategoryLandingElement: {
        prototype: HTMLCategoryLandingElement;
        new (): HTMLCategoryLandingElement;
    };
    interface HTMLPageHeadlineElement extends Components.PageHeadline, HTMLStencilElement {
    }
    var HTMLPageHeadlineElement: {
        prototype: HTMLPageHeadlineElement;
        new (): HTMLPageHeadlineElement;
    };
    interface HTMLProductListElement extends Components.ProductList, HTMLStencilElement {
    }
    var HTMLProductListElement: {
        prototype: HTMLProductListElement;
        new (): HTMLProductListElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-root": HTMLAppRootElement;
        "category-landing": HTMLCategoryLandingElement;
        "page-headline": HTMLPageHeadlineElement;
        "product-list": HTMLProductListElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface CategoryLanding {
    }
    interface PageHeadline {
        "text"?: String;
    }
    interface ProductList {
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-root": AppRoot;
        "category-landing": CategoryLanding;
        "page-headline": PageHeadline;
        "product-list": ProductList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "category-landing": LocalJSX.CategoryLanding & JSXBase.HTMLAttributes<HTMLCategoryLandingElement>;
            "page-headline": LocalJSX.PageHeadline & JSXBase.HTMLAttributes<HTMLPageHeadlineElement>;
            "product-list": LocalJSX.ProductList & JSXBase.HTMLAttributes<HTMLProductListElement>;
        }
    }
}
