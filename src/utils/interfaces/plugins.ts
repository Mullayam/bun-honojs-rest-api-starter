import { Context } from "hono";
import { ContentSecurityPolicyOptionHandler } from "hono/secure-headers";

export type CORSOptions = {
    origin: string | string[] | ((origin: string, c: Context) => string | undefined | null);
    allowMethods?: string[];
    allowHeaders?: string[];
    maxAge?: number;
    credentials?: boolean;
    exposeHeaders?: string[];
};
type IsAllowedOriginHandler = (origin: string, context: Context) => boolean;
export interface CSRFOptions {
    origin?: string | string[] | IsAllowedOriginHandler;
}
type overridableHeader = boolean | string;
interface ReportToOptions {
    group: string;
    max_age: number;
    endpoints: ReportToEndpoint[];
}
interface ReportToEndpoint {
    url: string;
}

interface ReportingEndpointOptions {
    name: string;
    url: string;
}
type ContentSecurityPolicyOptionValue = (string | ContentSecurityPolicyOptionHandler)[];
interface ContentSecurityPolicyOptions {
    defaultSrc?: ContentSecurityPolicyOptionValue;
    baseUri?: ContentSecurityPolicyOptionValue;
    childSrc?: ContentSecurityPolicyOptionValue;
    connectSrc?: ContentSecurityPolicyOptionValue;
    fontSrc?: ContentSecurityPolicyOptionValue;
    formAction?: ContentSecurityPolicyOptionValue;
    frameAncestors?: ContentSecurityPolicyOptionValue;
    frameSrc?: ContentSecurityPolicyOptionValue;
    imgSrc?: ContentSecurityPolicyOptionValue;
    manifestSrc?: ContentSecurityPolicyOptionValue;
    mediaSrc?: ContentSecurityPolicyOptionValue;
    objectSrc?: ContentSecurityPolicyOptionValue;
    reportTo?: string;
    sandbox?: ContentSecurityPolicyOptionValue;
    scriptSrc?: ContentSecurityPolicyOptionValue;
    scriptSrcAttr?: ContentSecurityPolicyOptionValue;
    scriptSrcElem?: ContentSecurityPolicyOptionValue;
    styleSrc?: ContentSecurityPolicyOptionValue;
    styleSrcAttr?: ContentSecurityPolicyOptionValue;
    styleSrcElem?: ContentSecurityPolicyOptionValue;
    upgradeInsecureRequests?: ContentSecurityPolicyOptionValue;
    workerSrc?: ContentSecurityPolicyOptionValue;
}
export interface SecureHeadersOptions {
    contentSecurityPolicy?: ContentSecurityPolicyOptions;
    crossOriginEmbedderPolicy?: overridableHeader;
    crossOriginResourcePolicy?: overridableHeader;
    crossOriginOpenerPolicy?: overridableHeader;
    originAgentCluster?: overridableHeader;
    referrerPolicy?: overridableHeader;
    reportingEndpoints?: ReportingEndpointOptions[];
    reportTo?: ReportToOptions[];
    strictTransportSecurity?: overridableHeader;
    xContentTypeOptions?: overridableHeader;
    xDnsPrefetchControl?: overridableHeader;
    xDownloadOptions?: overridableHeader;
    xFrameOptions?: overridableHeader;
    xPermittedCrossDomainPolicies?: overridableHeader;
    xXssProtection?: overridableHeader;
}
export type PrettyOptions = {
    space: number;
};
export type ETagOptions = {
    retainedHeaders?: string[];
    weak?: boolean;
};