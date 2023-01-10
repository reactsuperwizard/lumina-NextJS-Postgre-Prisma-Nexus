export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
    BigInt: any;
    DateTime: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: any;
    /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSONObject: any;
    Json: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};
export declare type AffectedRowsOutput = {
    count: Scalars['Int'];
};
/** Asset managed and stored in midas db to associate unique, immutable id to cloudinary public id */
export declare type Asset = {
    assetType: AssetType;
    createdAt: Scalars['DateTime'];
    folder?: Maybe<Folder>;
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    publicId: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    url: Scalars['String'];
};
export declare type AssetCreateInput = {
    assetType?: Maybe<AssetType>;
    createdAt?: Maybe<Scalars['DateTime']>;
    folder?: Maybe<FolderCreateNestedOneWithoutAssetsInput>;
    name?: Maybe<Scalars['String']>;
    publicId: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
export declare type AssetCreateNestedManyWithoutFolderInput = {
    connect?: Maybe<Array<AssetWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<AssetCreateOrConnectWithoutFolderInput>>;
    create?: Maybe<Array<AssetCreateWithoutFolderInput>>;
};
export declare type AssetCreateOrConnectWithoutFolderInput = {
    create: AssetCreateWithoutFolderInput;
    where: AssetWhereUniqueInput;
};
export declare type AssetCreateWithoutFolderInput = {
    assetType?: Maybe<AssetType>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    publicId: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
export declare type AssetListRelationFilter = {
    every?: Maybe<AssetWhereInput>;
    none?: Maybe<AssetWhereInput>;
    some?: Maybe<AssetWhereInput>;
};
export declare type AssetOrderByInput = {
    assetType?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    folder?: Maybe<FolderOrderByInput>;
    folderId?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    publicId?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    url?: Maybe<SortOrder>;
};
export declare type AssetScalarWhereInput = {
    AND?: Maybe<Array<AssetScalarWhereInput>>;
    assetType?: Maybe<EnumAssetTypeFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    folderId?: Maybe<IntNullableFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<AssetScalarWhereInput>>;
    OR?: Maybe<Array<AssetScalarWhereInput>>;
    publicId?: Maybe<StringFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    url?: Maybe<StringFilter>;
};
export declare enum AssetType {
    Audio = "audio",
    Image = "image",
    Raw = "raw",
    Video = "video"
}
export declare type AssetUpdateInput = {
    assetType?: Maybe<EnumAssetTypeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutAssetsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    publicId?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<StringFieldUpdateOperationsInput>;
};
export declare type AssetUpdateManyMutationInput = {
    assetType?: Maybe<EnumAssetTypeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    publicId?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<StringFieldUpdateOperationsInput>;
};
export declare type AssetUpdateManyWithWhereWithoutFolderInput = {
    data: AssetUpdateManyMutationInput;
    where: AssetScalarWhereInput;
};
export declare type AssetUpdateManyWithoutFolderInput = {
    connect?: Maybe<Array<AssetWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<AssetCreateOrConnectWithoutFolderInput>>;
    create?: Maybe<Array<AssetCreateWithoutFolderInput>>;
    delete?: Maybe<Array<AssetWhereUniqueInput>>;
    deleteMany?: Maybe<Array<AssetScalarWhereInput>>;
    disconnect?: Maybe<Array<AssetWhereUniqueInput>>;
    set?: Maybe<Array<AssetWhereUniqueInput>>;
    update?: Maybe<Array<AssetUpdateWithWhereUniqueWithoutFolderInput>>;
    updateMany?: Maybe<Array<AssetUpdateManyWithWhereWithoutFolderInput>>;
    upsert?: Maybe<Array<AssetUpsertWithWhereUniqueWithoutFolderInput>>;
};
export declare type AssetUpdateWithWhereUniqueWithoutFolderInput = {
    data: AssetUpdateWithoutFolderInput;
    where: AssetWhereUniqueInput;
};
export declare type AssetUpdateWithoutFolderInput = {
    assetType?: Maybe<EnumAssetTypeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    publicId?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<StringFieldUpdateOperationsInput>;
};
export declare type AssetUpsertWithWhereUniqueWithoutFolderInput = {
    create: AssetCreateWithoutFolderInput;
    update: AssetUpdateWithoutFolderInput;
    where: AssetWhereUniqueInput;
};
export declare type AssetWhereInput = {
    AND?: Maybe<Array<AssetWhereInput>>;
    assetType?: Maybe<EnumAssetTypeFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    folder?: Maybe<FolderWhereInput>;
    folderId?: Maybe<IntNullableFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<AssetWhereInput>>;
    OR?: Maybe<Array<AssetWhereInput>>;
    publicId?: Maybe<StringFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    url?: Maybe<StringFilter>;
};
export declare type AssetWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    publicId?: Maybe<Scalars['String']>;
};
export declare type BigIntNullableFilter = {
    equals?: Maybe<Scalars['BigInt']>;
    gt?: Maybe<Scalars['BigInt']>;
    gte?: Maybe<Scalars['BigInt']>;
    in?: Maybe<Array<Scalars['BigInt']>>;
    lt?: Maybe<Scalars['BigInt']>;
    lte?: Maybe<Scalars['BigInt']>;
    not?: Maybe<NestedBigIntNullableFilter>;
    notIn?: Maybe<Array<Scalars['BigInt']>>;
};
export declare type BoolFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['Boolean']>;
};
export declare type BoolFilter = {
    equals?: Maybe<Scalars['Boolean']>;
    not?: Maybe<NestedBoolFilter>;
};
export declare type BoolNullableFilter = {
    equals?: Maybe<Scalars['Boolean']>;
    not?: Maybe<NestedBoolNullableFilter>;
};
export declare type CloudinaryAsset = {
    access_mode?: Maybe<Scalars['String']>;
    aspect_ration?: Maybe<Scalars['Int']>;
    bytes?: Maybe<Scalars['Int']>;
    context?: Maybe<Scalars['JSONObject']>;
    created_at?: Maybe<Scalars['String']>;
    format?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['Int']>;
    pixels?: Maybe<Scalars['Int']>;
    public_id?: Maybe<Scalars['String']>;
    resource_type?: Maybe<CloudinaryResourceType>;
    secure_url?: Maybe<Scalars['String']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
    type?: Maybe<Scalars['String']>;
    uploaded_at?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    version?: Maybe<Scalars['String']>;
    width?: Maybe<Scalars['Int']>;
};
export declare type CloudinaryAssetDeleteInput = {
    publicId: Scalars['String'];
    type?: Scalars['String'];
};
export declare type CloudinaryAssetUpdateInput = {
    newPublicId?: Maybe<Scalars['String']>;
    publicId: Scalars['String'];
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
    type?: Scalars['String'];
};
export declare type CloudinaryAssets = {
    /** Parameter to use to get next page of results. */
    next_cursor?: Maybe<Scalars['String']>;
    rate_limit_allowed?: Maybe<Scalars['Int']>;
    rate_limit_remaining?: Maybe<Scalars['Int']>;
    rate_limit_reset_at?: Maybe<Scalars['String']>;
    resources?: Maybe<Array<Maybe<CloudinaryGetAssets>>>;
    /** Total time to return query. */
    time?: Maybe<Scalars['Int']>;
    /** Total results from query. */
    total_count?: Maybe<Scalars['Int']>;
};
export declare type CloudinaryDeletedAsset = {
    deleted?: Maybe<Scalars['JSONObject']>;
};
export declare type CloudinaryGetAsset = CloudinaryAsset & {
    access_mode?: Maybe<Scalars['String']>;
    aspect_ration?: Maybe<Scalars['Int']>;
    bytes?: Maybe<Scalars['Int']>;
    /** Color analysis of image */
    colors?: Maybe<Scalars['JSON']>;
    context?: Maybe<Scalars['JSONObject']>;
    created_at?: Maybe<Scalars['String']>;
    /** List of coordinates of detected faces */
    faces?: Maybe<Scalars['JSON']>;
    format?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['Int']>;
    pixels?: Maybe<Scalars['Int']>;
    public_id?: Maybe<Scalars['String']>;
    resource_type?: Maybe<CloudinaryResourceType>;
    secure_url?: Maybe<Scalars['String']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
    type?: Maybe<Scalars['String']>;
    uploaded_at?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    version?: Maybe<Scalars['String']>;
    width?: Maybe<Scalars['Int']>;
};
/** Inputs to search for specific Cloudinary assets. Returns a list of assets. */
export declare type CloudinaryGetAssetInput = {
    /** Public Id of asset to fetch. */
    publicId: Scalars['String'];
    /** "image", "raw", "video".  Use "video" for audio and other footage items." */
    resourceType?: Scalars['String'];
    /** https://cloudinary.com/documentation/admin_api#get_resources */
    type?: Scalars['String'];
    /** Provide color analysis of returned asset. */
    withColors?: Scalars['Boolean'];
    /** Provide context with returned asset. */
    withContext?: Scalars['Boolean'];
    /** Provide coordinates of detected faces in returned asset. */
    withFaces?: Scalars['Boolean'];
    /** Provide tags with returned asset. */
    withTags?: Scalars['Boolean'];
};
export declare type CloudinaryGetAssets = CloudinaryAsset & {
    access_mode?: Maybe<Scalars['String']>;
    aspect_ration?: Maybe<Scalars['Int']>;
    bytes?: Maybe<Scalars['Int']>;
    /** Not yet implemented. */
    colors?: Maybe<Scalars['JSON']>;
    context?: Maybe<Scalars['JSONObject']>;
    created_at?: Maybe<Scalars['String']>;
    filename?: Maybe<Scalars['String']>;
    folder?: Maybe<Scalars['String']>;
    format?: Maybe<Scalars['String']>;
    height?: Maybe<Scalars['Int']>;
    id?: Maybe<Scalars['Int']>;
    pixels?: Maybe<Scalars['Int']>;
    public_id?: Maybe<Scalars['String']>;
    resource_type?: Maybe<CloudinaryResourceType>;
    secure_url?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
    type?: Maybe<Scalars['String']>;
    uploaded_at?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    version?: Maybe<Scalars['String']>;
    width?: Maybe<Scalars['Int']>;
};
/** Inputs to search for Cloudinary assets. */
export declare type CloudinaryGetAssetsInput = {
    /** Search expression used to return resources.  See https://cloudinary.com/documentation/search_api#expressions for examples. */
    expression?: Maybe<Scalars['String']>;
    /** Number of results to return per page.  Max 500. */
    maxResults?: Scalars['Int'];
    /** Cursor to return next page of results. */
    nextCursor?: Maybe<Scalars['String']>;
    /** Field to sort on. */
    sortBy?: Scalars['String'];
    sortDirection?: CloudinarySortType;
    /** Provide context with returned assets. */
    withContext?: Scalars['Boolean'];
    /** Provide tags with returned assets. */
    withTags?: Scalars['Boolean'];
};
/** Resource types for assets stored in Cloudinary.  Note: use 'video' for all audio assets, e.g. .mp3 */
export declare enum CloudinaryResourceType {
    Image = "image",
    Raw = "raw",
    Video = "video"
}
/** Direction to sort results. */
export declare enum CloudinarySortType {
    Asc = "asc",
    Desc = "desc"
}
export declare type CloudinaryTags = {
    /** Cursor to return next page of results. */
    next_cursor?: Maybe<Scalars['String']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};
/** Inputs to search for Cloudinary asset tags. */
export declare type CloudinaryTagsInput = {
    /** Number of results to return per page.  Max 500. */
    max_results?: Maybe<Scalars['Int']>;
    /** Cursor to return next page of results. */
    next_cursor?: Maybe<Scalars['String']>;
    /** Search term used to search for tags by name. */
    prefix?: Maybe<Scalars['String']>;
    resource_type?: Maybe<CloudinaryResourceType>;
};
export declare type Count = {
    count?: Maybe<Scalars['Int']>;
};
export declare type Customer = {
    active: Scalars['Boolean'];
    approvedTemplates: Array<TemplateFlavor>;
    canRevise: Scalars['Boolean'];
    createdAt: Scalars['DateTime'];
    defaultTemplate?: Maybe<TemplateFlavor>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    id: Scalars['Int'];
    isPaid: Scalars['Boolean'];
    mappings: Array<MasterTemplate>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders: Array<Order>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<Platform>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates: Array<TemplateFlavor>;
    requests: Array<Request>;
    scripts: Array<Script>;
    slug: Scalars['String'];
    tenant: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    users: Array<User>;
    videos: Array<Video>;
};
export declare type CustomerMappingsArgs = {
    cursor?: Maybe<MasterTemplateWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type CustomerOrdersArgs = {
    cursor?: Maybe<OrderWhereUniqueInput>;
    orderBy?: Maybe<Array<OrderOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type CustomerRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<RequestWhereInput>;
};
export declare type CustomerScriptsArgs = {
    cursor?: Maybe<ScriptWhereUniqueInput>;
    orderBy?: Maybe<Array<ScriptOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<ScriptWhereInput>;
};
export declare type CustomerUsersArgs = {
    cursor?: Maybe<UserWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type CustomerVideosArgs = {
    cursor?: Maybe<VideoWhereUniqueInput>;
    orderBy?: Maybe<Array<VideoOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<VideoWhereInput>;
};
export declare type CustomerCreateInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateNestedManyWithoutPlatformInput = {
    connect?: Maybe<Array<CustomerWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<CustomerCreateOrConnectWithoutPlatformInput>>;
    create?: Maybe<Array<CustomerCreateWithoutPlatformInput>>;
};
export declare type CustomerCreateNestedManyWithoutUsersInput = {
    connect?: Maybe<Array<CustomerWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<CustomerCreateOrConnectWithoutUsersInput>>;
    create?: Maybe<Array<CustomerCreateWithoutUsersInput>>;
};
export declare type CustomerCreateNestedOneWithoutFolderInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutFolderInput>;
    create?: Maybe<CustomerCreateWithoutFolderInput>;
};
export declare type CustomerCreateNestedOneWithoutMappingsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutMappingsInput>;
    create?: Maybe<CustomerCreateWithoutMappingsInput>;
};
export declare type CustomerCreateNestedOneWithoutOrdersInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutOrdersInput>;
    create?: Maybe<CustomerCreateWithoutOrdersInput>;
};
export declare type CustomerCreateNestedOneWithoutRequestsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<CustomerCreateWithoutRequestsInput>;
};
export declare type CustomerCreateNestedOneWithoutScriptsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<CustomerCreateWithoutScriptsInput>;
};
export declare type CustomerCreateNestedOneWithoutSubscriptionInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutSubscriptionInput>;
    create?: Maybe<CustomerCreateWithoutSubscriptionInput>;
};
export declare type CustomerCreateNestedOneWithoutTemplatesInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutTemplatesInput>;
    create?: Maybe<CustomerCreateWithoutTemplatesInput>;
};
export declare type CustomerCreateNestedOneWithoutVideosInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutVideosInput>;
    create?: Maybe<CustomerCreateWithoutVideosInput>;
};
export declare type CustomerCreateOrConnectWithoutFolderInput = {
    create: CustomerCreateWithoutFolderInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutMappingsInput = {
    create: CustomerCreateWithoutMappingsInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutOrdersInput = {
    create: CustomerCreateWithoutOrdersInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutPlatformInput = {
    create: CustomerCreateWithoutPlatformInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutRequestsInput = {
    create: CustomerCreateWithoutRequestsInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutScriptsInput = {
    create: CustomerCreateWithoutScriptsInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutSubscriptionInput = {
    create: CustomerCreateWithoutSubscriptionInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutTemplatesInput = {
    create: CustomerCreateWithoutTemplatesInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutUsersInput = {
    create: CustomerCreateWithoutUsersInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateOrConnectWithoutVideosInput = {
    create: CustomerCreateWithoutVideosInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerCreateWithoutFolderInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutMappingsInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutOrdersInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutPlatformInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutRequestsInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutScriptsInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutSubscriptionInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutTemplatesInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutUsersInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    videos?: Maybe<VideoCreateNestedManyWithoutCustomerInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateWithoutVideosInput = {
    active?: Maybe<Scalars['Boolean']>;
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    approvedTemplates?: Maybe<CustomerCreateapprovedTemplatesInput>;
    canRevise?: Maybe<Scalars['Boolean']>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    defaultTemplate?: Maybe<TemplateFlavor>;
    folder?: Maybe<FolderCreateNestedOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    isPaid?: Maybe<Scalars['Boolean']>;
    mappings?: Maybe<MasterTemplateCreateNestedManyWithoutCustomerInput>;
    name: Scalars['String'];
    notes?: Maybe<Scalars['String']>;
    orders?: Maybe<OrderCreateNestedManyWithoutCustomerInput>;
    pipedriveId?: Maybe<Scalars['Int']>;
    platform?: Maybe<PlatformCreateNestedOneWithoutCustomersInput>;
    quickbooksId?: Maybe<Scalars['Int']>;
    requestedTemplates?: Maybe<CustomerCreaterequestedTemplatesInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutCustomerInput>;
    slug: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    stripeId?: Maybe<Scalars['String']>;
    subscription?: Maybe<SubCreateNestedOneWithoutCustomerInput>;
    templates?: Maybe<TemplateCreateNestedManyWithoutCustomerInput>;
    tenant: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    users?: Maybe<UserCreateNestedManyWithoutCustomersInput>;
    zip?: Maybe<Scalars['String']>;
};
export declare type CustomerCreateapprovedTemplatesInput = {
    set?: Maybe<Array<TemplateFlavor>>;
};
export declare type CustomerCreaterequestedTemplatesInput = {
    set?: Maybe<Array<TemplateFlavor>>;
};
export declare type CustomerListRelationFilter = {
    every?: Maybe<CustomerWhereInput>;
    none?: Maybe<CustomerWhereInput>;
    some?: Maybe<CustomerWhereInput>;
};
export declare type CustomerOrderByInput = {
    active?: Maybe<SortOrder>;
    addressLine1?: Maybe<SortOrder>;
    addressLine2?: Maybe<SortOrder>;
    approvedTemplates?: Maybe<SortOrder>;
    canRevise?: Maybe<SortOrder>;
    city?: Maybe<SortOrder>;
    country?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    defaultTemplate?: Maybe<SortOrder>;
    folder?: Maybe<FolderOrderByInput>;
    hsCompanyId?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    isPaid?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    notes?: Maybe<SortOrder>;
    pipedriveId?: Maybe<SortOrder>;
    platform?: Maybe<PlatformOrderByInput>;
    platformId?: Maybe<SortOrder>;
    quickbooksId?: Maybe<SortOrder>;
    requestedTemplates?: Maybe<SortOrder>;
    slug?: Maybe<SortOrder>;
    state?: Maybe<SortOrder>;
    stripeId?: Maybe<SortOrder>;
    subId?: Maybe<SortOrder>;
    subscription?: Maybe<SubOrderByInput>;
    tenant?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    zip?: Maybe<SortOrder>;
};
export declare type CustomerScalarWhereInput = {
    active?: Maybe<BoolFilter>;
    addressLine1?: Maybe<StringNullableFilter>;
    addressLine2?: Maybe<StringNullableFilter>;
    AND?: Maybe<Array<CustomerScalarWhereInput>>;
    approvedTemplates?: Maybe<EnumTemplateFlavorNullableListFilter>;
    canRevise?: Maybe<BoolFilter>;
    city?: Maybe<StringNullableFilter>;
    country?: Maybe<StringNullableFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    defaultTemplate?: Maybe<EnumTemplateFlavorNullableFilter>;
    hsCompanyId?: Maybe<BigIntNullableFilter>;
    id?: Maybe<IntFilter>;
    isPaid?: Maybe<BoolFilter>;
    name?: Maybe<StringFilter>;
    NOT?: Maybe<Array<CustomerScalarWhereInput>>;
    notes?: Maybe<StringNullableFilter>;
    OR?: Maybe<Array<CustomerScalarWhereInput>>;
    pipedriveId?: Maybe<IntNullableFilter>;
    platformId?: Maybe<IntNullableFilter>;
    quickbooksId?: Maybe<IntNullableFilter>;
    requestedTemplates?: Maybe<EnumTemplateFlavorNullableListFilter>;
    slug?: Maybe<StringFilter>;
    state?: Maybe<StringNullableFilter>;
    stripeId?: Maybe<StringNullableFilter>;
    subId?: Maybe<IntNullableFilter>;
    tenant?: Maybe<StringFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    zip?: Maybe<StringNullableFilter>;
};
export declare type CustomerUpdateInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateManyMutationInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateManyWithWhereWithoutPlatformInput = {
    data: CustomerUpdateManyMutationInput;
    where: CustomerScalarWhereInput;
};
export declare type CustomerUpdateManyWithWhereWithoutUsersInput = {
    data: CustomerUpdateManyMutationInput;
    where: CustomerScalarWhereInput;
};
export declare type CustomerUpdateManyWithoutPlatformInput = {
    connect?: Maybe<Array<CustomerWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<CustomerCreateOrConnectWithoutPlatformInput>>;
    create?: Maybe<Array<CustomerCreateWithoutPlatformInput>>;
    delete?: Maybe<Array<CustomerWhereUniqueInput>>;
    deleteMany?: Maybe<Array<CustomerScalarWhereInput>>;
    disconnect?: Maybe<Array<CustomerWhereUniqueInput>>;
    set?: Maybe<Array<CustomerWhereUniqueInput>>;
    update?: Maybe<Array<CustomerUpdateWithWhereUniqueWithoutPlatformInput>>;
    updateMany?: Maybe<Array<CustomerUpdateManyWithWhereWithoutPlatformInput>>;
    upsert?: Maybe<Array<CustomerUpsertWithWhereUniqueWithoutPlatformInput>>;
};
export declare type CustomerUpdateManyWithoutUsersInput = {
    connect?: Maybe<Array<CustomerWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<CustomerCreateOrConnectWithoutUsersInput>>;
    create?: Maybe<Array<CustomerCreateWithoutUsersInput>>;
    delete?: Maybe<Array<CustomerWhereUniqueInput>>;
    deleteMany?: Maybe<Array<CustomerScalarWhereInput>>;
    disconnect?: Maybe<Array<CustomerWhereUniqueInput>>;
    set?: Maybe<Array<CustomerWhereUniqueInput>>;
    update?: Maybe<Array<CustomerUpdateWithWhereUniqueWithoutUsersInput>>;
    updateMany?: Maybe<Array<CustomerUpdateManyWithWhereWithoutUsersInput>>;
    upsert?: Maybe<Array<CustomerUpsertWithWhereUniqueWithoutUsersInput>>;
};
export declare type CustomerUpdateOneRequiredWithoutMappingsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutMappingsInput>;
    create?: Maybe<CustomerCreateWithoutMappingsInput>;
    update?: Maybe<CustomerUpdateWithoutMappingsInput>;
    upsert?: Maybe<CustomerUpsertWithoutMappingsInput>;
};
export declare type CustomerUpdateOneRequiredWithoutOrdersInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutOrdersInput>;
    create?: Maybe<CustomerCreateWithoutOrdersInput>;
    update?: Maybe<CustomerUpdateWithoutOrdersInput>;
    upsert?: Maybe<CustomerUpsertWithoutOrdersInput>;
};
export declare type CustomerUpdateOneRequiredWithoutRequestsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<CustomerCreateWithoutRequestsInput>;
    update?: Maybe<CustomerUpdateWithoutRequestsInput>;
    upsert?: Maybe<CustomerUpsertWithoutRequestsInput>;
};
export declare type CustomerUpdateOneRequiredWithoutVideosInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutVideosInput>;
    create?: Maybe<CustomerCreateWithoutVideosInput>;
    update?: Maybe<CustomerUpdateWithoutVideosInput>;
    upsert?: Maybe<CustomerUpsertWithoutVideosInput>;
};
export declare type CustomerUpdateOneWithoutFolderInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutFolderInput>;
    create?: Maybe<CustomerCreateWithoutFolderInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<CustomerUpdateWithoutFolderInput>;
    upsert?: Maybe<CustomerUpsertWithoutFolderInput>;
};
export declare type CustomerUpdateOneWithoutScriptsInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<CustomerCreateWithoutScriptsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<CustomerUpdateWithoutScriptsInput>;
    upsert?: Maybe<CustomerUpsertWithoutScriptsInput>;
};
export declare type CustomerUpdateOneWithoutSubscriptionInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutSubscriptionInput>;
    create?: Maybe<CustomerCreateWithoutSubscriptionInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<CustomerUpdateWithoutSubscriptionInput>;
    upsert?: Maybe<CustomerUpsertWithoutSubscriptionInput>;
};
export declare type CustomerUpdateOneWithoutTemplatesInput = {
    connect?: Maybe<CustomerWhereUniqueInput>;
    connectOrCreate?: Maybe<CustomerCreateOrConnectWithoutTemplatesInput>;
    create?: Maybe<CustomerCreateWithoutTemplatesInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<CustomerUpdateWithoutTemplatesInput>;
    upsert?: Maybe<CustomerUpsertWithoutTemplatesInput>;
};
export declare type CustomerUpdateWithWhereUniqueWithoutPlatformInput = {
    data: CustomerUpdateWithoutPlatformInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerUpdateWithWhereUniqueWithoutUsersInput = {
    data: CustomerUpdateWithoutUsersInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerUpdateWithoutFolderInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutMappingsInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutOrdersInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutPlatformInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutRequestsInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutScriptsInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutSubscriptionInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutTemplatesInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutUsersInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    videos?: Maybe<VideoUpdateManyWithoutCustomerInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateWithoutVideosInput = {
    active?: Maybe<BoolFieldUpdateOperationsInput>;
    addressLine1?: Maybe<NullableStringFieldUpdateOperationsInput>;
    addressLine2?: Maybe<NullableStringFieldUpdateOperationsInput>;
    approvedTemplates?: Maybe<CustomerUpdateapprovedTemplatesInput>;
    canRevise?: Maybe<BoolFieldUpdateOperationsInput>;
    city?: Maybe<NullableStringFieldUpdateOperationsInput>;
    country?: Maybe<NullableStringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    defaultTemplate?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    folder?: Maybe<FolderUpdateOneWithoutCustomerInput>;
    hsCompanyId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isPaid?: Maybe<BoolFieldUpdateOperationsInput>;
    mappings?: Maybe<MasterTemplateUpdateManyWithoutCustomerInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    orders?: Maybe<OrderUpdateManyWithoutCustomerInput>;
    pipedriveId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    platform?: Maybe<PlatformUpdateOneWithoutCustomersInput>;
    quickbooksId?: Maybe<NullableIntFieldUpdateOperationsInput>;
    requestedTemplates?: Maybe<CustomerUpdaterequestedTemplatesInput>;
    requests?: Maybe<RequestUpdateManyWithoutCustomerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutCustomerInput>;
    slug?: Maybe<StringFieldUpdateOperationsInput>;
    state?: Maybe<NullableStringFieldUpdateOperationsInput>;
    stripeId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    subscription?: Maybe<SubUpdateOneWithoutCustomerInput>;
    templates?: Maybe<TemplateUpdateManyWithoutCustomerInput>;
    tenant?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutCustomersInput>;
    zip?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type CustomerUpdateapprovedTemplatesInput = {
    set?: Maybe<Array<TemplateFlavor>>;
};
export declare type CustomerUpdaterequestedTemplatesInput = {
    set?: Maybe<Array<TemplateFlavor>>;
};
export declare type CustomerUpsertWithWhereUniqueWithoutPlatformInput = {
    create: CustomerCreateWithoutPlatformInput;
    update: CustomerUpdateWithoutPlatformInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerUpsertWithWhereUniqueWithoutUsersInput = {
    create: CustomerCreateWithoutUsersInput;
    update: CustomerUpdateWithoutUsersInput;
    where: CustomerWhereUniqueInput;
};
export declare type CustomerUpsertWithoutFolderInput = {
    create: CustomerCreateWithoutFolderInput;
    update: CustomerUpdateWithoutFolderInput;
};
export declare type CustomerUpsertWithoutMappingsInput = {
    create: CustomerCreateWithoutMappingsInput;
    update: CustomerUpdateWithoutMappingsInput;
};
export declare type CustomerUpsertWithoutOrdersInput = {
    create: CustomerCreateWithoutOrdersInput;
    update: CustomerUpdateWithoutOrdersInput;
};
export declare type CustomerUpsertWithoutRequestsInput = {
    create: CustomerCreateWithoutRequestsInput;
    update: CustomerUpdateWithoutRequestsInput;
};
export declare type CustomerUpsertWithoutScriptsInput = {
    create: CustomerCreateWithoutScriptsInput;
    update: CustomerUpdateWithoutScriptsInput;
};
export declare type CustomerUpsertWithoutSubscriptionInput = {
    create: CustomerCreateWithoutSubscriptionInput;
    update: CustomerUpdateWithoutSubscriptionInput;
};
export declare type CustomerUpsertWithoutTemplatesInput = {
    create: CustomerCreateWithoutTemplatesInput;
    update: CustomerUpdateWithoutTemplatesInput;
};
export declare type CustomerUpsertWithoutVideosInput = {
    create: CustomerCreateWithoutVideosInput;
    update: CustomerUpdateWithoutVideosInput;
};
export declare type CustomerWhereInput = {
    active?: Maybe<BoolFilter>;
    addressLine1?: Maybe<StringNullableFilter>;
    addressLine2?: Maybe<StringNullableFilter>;
    AND?: Maybe<Array<CustomerWhereInput>>;
    approvedTemplates?: Maybe<EnumTemplateFlavorNullableListFilter>;
    canRevise?: Maybe<BoolFilter>;
    city?: Maybe<StringNullableFilter>;
    country?: Maybe<StringNullableFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    defaultTemplate?: Maybe<EnumTemplateFlavorNullableFilter>;
    folder?: Maybe<FolderWhereInput>;
    hsCompanyId?: Maybe<BigIntNullableFilter>;
    id?: Maybe<IntFilter>;
    isPaid?: Maybe<BoolFilter>;
    mappings?: Maybe<MasterTemplateListRelationFilter>;
    name?: Maybe<StringFilter>;
    NOT?: Maybe<Array<CustomerWhereInput>>;
    notes?: Maybe<StringNullableFilter>;
    OR?: Maybe<Array<CustomerWhereInput>>;
    orders?: Maybe<OrderListRelationFilter>;
    pipedriveId?: Maybe<IntNullableFilter>;
    platform?: Maybe<PlatformWhereInput>;
    platformId?: Maybe<IntNullableFilter>;
    quickbooksId?: Maybe<IntNullableFilter>;
    requestedTemplates?: Maybe<EnumTemplateFlavorNullableListFilter>;
    requests?: Maybe<RequestListRelationFilter>;
    scripts?: Maybe<ScriptListRelationFilter>;
    slug?: Maybe<StringFilter>;
    state?: Maybe<StringNullableFilter>;
    stripeId?: Maybe<StringNullableFilter>;
    subId?: Maybe<IntNullableFilter>;
    subscription?: Maybe<SubWhereInput>;
    templates?: Maybe<TemplateListRelationFilter>;
    tenant?: Maybe<StringFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    users?: Maybe<UserListRelationFilter>;
    videos?: Maybe<VideoListRelationFilter>;
    zip?: Maybe<StringNullableFilter>;
};
export declare type CustomerWhereUniqueInput = {
    hsCompanyId?: Maybe<Scalars['BigInt']>;
    id?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    slug?: Maybe<Scalars['String']>;
    subId?: Maybe<Scalars['Int']>;
    tenant?: Maybe<Scalars['String']>;
};
export declare type DailyActiveUsers = {
    dailyUsers?: Maybe<Array<Maybe<DailyUser>>>;
};
export declare type DailyUser = {
    activeUsers?: Maybe<Scalars['Int']>;
    date?: Maybe<Scalars['String']>;
};
export declare type DateTimeFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['DateTime']>;
};
export declare type DateTimeFilter = {
    equals?: Maybe<Scalars['DateTime']>;
    gt?: Maybe<Scalars['DateTime']>;
    gte?: Maybe<Scalars['DateTime']>;
    in?: Maybe<Array<Scalars['DateTime']>>;
    lt?: Maybe<Scalars['DateTime']>;
    lte?: Maybe<Scalars['DateTime']>;
    not?: Maybe<NestedDateTimeFilter>;
    notIn?: Maybe<Array<Scalars['DateTime']>>;
};
export declare type DateTimeNullableFilter = {
    equals?: Maybe<Scalars['DateTime']>;
    gt?: Maybe<Scalars['DateTime']>;
    gte?: Maybe<Scalars['DateTime']>;
    in?: Maybe<Array<Scalars['DateTime']>>;
    lt?: Maybe<Scalars['DateTime']>;
    lte?: Maybe<Scalars['DateTime']>;
    not?: Maybe<NestedDateTimeNullableFilter>;
    notIn?: Maybe<Array<Scalars['DateTime']>>;
};
export declare type EnumAssetTypeFieldUpdateOperationsInput = {
    set?: Maybe<AssetType>;
};
export declare type EnumAssetTypeFilter = {
    equals?: Maybe<AssetType>;
    in?: Maybe<Array<AssetType>>;
    not?: Maybe<NestedEnumAssetTypeFilter>;
    notIn?: Maybe<Array<AssetType>>;
};
export declare type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: Maybe<OrderStatus>;
};
export declare type EnumOrderStatusFilter = {
    equals?: Maybe<OrderStatus>;
    in?: Maybe<Array<OrderStatus>>;
    not?: Maybe<NestedEnumOrderStatusFilter>;
    notIn?: Maybe<Array<OrderStatus>>;
};
export declare type EnumRenderStatusFieldUpdateOperationsInput = {
    set?: Maybe<RenderStatus>;
};
export declare type EnumRenderStatusFilter = {
    equals?: Maybe<RenderStatus>;
    in?: Maybe<Array<RenderStatus>>;
    not?: Maybe<NestedEnumRenderStatusFilter>;
    notIn?: Maybe<Array<RenderStatus>>;
};
export declare type EnumRequestLogsEventFieldUpdateOperationsInput = {
    set?: Maybe<RequestLogsEvent>;
};
export declare type EnumRequestLogsEventFilter = {
    equals?: Maybe<RequestLogsEvent>;
    in?: Maybe<Array<RequestLogsEvent>>;
    not?: Maybe<NestedEnumRequestLogsEventFilter>;
    notIn?: Maybe<Array<RequestLogsEvent>>;
};
export declare type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: Maybe<RequestStatus>;
};
export declare type EnumRequestStatusFilter = {
    equals?: Maybe<RequestStatus>;
    in?: Maybe<Array<RequestStatus>>;
    not?: Maybe<NestedEnumRequestStatusFilter>;
    notIn?: Maybe<Array<RequestStatus>>;
};
export declare type EnumTemplateFlavorFieldUpdateOperationsInput = {
    set?: Maybe<TemplateFlavor>;
};
export declare type EnumTemplateFlavorFilter = {
    equals?: Maybe<TemplateFlavor>;
    in?: Maybe<Array<TemplateFlavor>>;
    not?: Maybe<NestedEnumTemplateFlavorFilter>;
    notIn?: Maybe<Array<TemplateFlavor>>;
};
export declare type EnumTemplateFlavorNullableFilter = {
    equals?: Maybe<TemplateFlavor>;
    in?: Maybe<Array<TemplateFlavor>>;
    not?: Maybe<NestedEnumTemplateFlavorNullableFilter>;
    notIn?: Maybe<Array<TemplateFlavor>>;
};
export declare type EnumTemplateFlavorNullableListFilter = {
    equals?: Maybe<Array<TemplateFlavor>>;
    has?: Maybe<TemplateFlavor>;
    hasEvery?: Maybe<Array<TemplateFlavor>>;
    hasSome?: Maybe<Array<TemplateFlavor>>;
    isEmpty?: Maybe<Scalars['Boolean']>;
};
export declare type EnumVideoStatusNullableFilter = {
    equals?: Maybe<VideoStatus>;
    in?: Maybe<Array<VideoStatus>>;
    not?: Maybe<NestedEnumVideoStatusNullableFilter>;
    notIn?: Maybe<Array<VideoStatus>>;
};
/** Folder type for organization of Assets */
export declare type Folder = {
    assets: Array<Asset>;
    children: Array<Folder>;
    createdAt: Scalars['DateTime'];
    customer?: Maybe<Customer>;
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<Folder>;
    updatedAt: Scalars['DateTime'];
};
/** Folder type for organization of Assets */
export declare type FolderAssetsArgs = {
    cursor?: Maybe<AssetWhereUniqueInput>;
    orderBy?: Maybe<Array<AssetOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
/** Folder type for organization of Assets */
export declare type FolderChildrenArgs = {
    cursor?: Maybe<FolderWhereUniqueInput>;
    orderBy?: Maybe<Array<FolderOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type FolderCreateInput = {
    assets?: Maybe<AssetCreateNestedManyWithoutFolderInput>;
    children?: Maybe<FolderCreateNestedManyWithoutParentInput>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutFolderInput>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<FolderCreateNestedOneWithoutChildrenInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FolderCreateNestedManyWithoutParentInput = {
    connect?: Maybe<Array<FolderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<FolderCreateOrConnectWithoutParentInput>>;
    create?: Maybe<Array<FolderCreateWithoutParentInput>>;
};
export declare type FolderCreateNestedOneWithoutAssetsInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutAssetsInput>;
    create?: Maybe<FolderCreateWithoutAssetsInput>;
};
export declare type FolderCreateNestedOneWithoutChildrenInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutChildrenInput>;
    create?: Maybe<FolderCreateWithoutChildrenInput>;
};
export declare type FolderCreateNestedOneWithoutCustomerInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutCustomerInput>;
    create?: Maybe<FolderCreateWithoutCustomerInput>;
};
export declare type FolderCreateOrConnectWithoutAssetsInput = {
    create: FolderCreateWithoutAssetsInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderCreateOrConnectWithoutChildrenInput = {
    create: FolderCreateWithoutChildrenInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderCreateOrConnectWithoutCustomerInput = {
    create: FolderCreateWithoutCustomerInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderCreateOrConnectWithoutParentInput = {
    create: FolderCreateWithoutParentInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderCreateWithoutAssetsInput = {
    children?: Maybe<FolderCreateNestedManyWithoutParentInput>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutFolderInput>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<FolderCreateNestedOneWithoutChildrenInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FolderCreateWithoutChildrenInput = {
    assets?: Maybe<AssetCreateNestedManyWithoutFolderInput>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutFolderInput>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<FolderCreateNestedOneWithoutChildrenInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FolderCreateWithoutCustomerInput = {
    assets?: Maybe<AssetCreateNestedManyWithoutFolderInput>;
    children?: Maybe<FolderCreateNestedManyWithoutParentInput>;
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<FolderCreateNestedOneWithoutChildrenInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FolderCreateWithoutParentInput = {
    assets?: Maybe<AssetCreateNestedManyWithoutFolderInput>;
    children?: Maybe<FolderCreateNestedManyWithoutParentInput>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutFolderInput>;
    name?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type FolderListRelationFilter = {
    every?: Maybe<FolderWhereInput>;
    none?: Maybe<FolderWhereInput>;
    some?: Maybe<FolderWhereInput>;
};
export declare type FolderOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customerTenant?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    parent?: Maybe<FolderOrderByInput>;
    parentId?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare type FolderScalarWhereInput = {
    AND?: Maybe<Array<FolderScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerTenant?: Maybe<StringNullableFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<FolderScalarWhereInput>>;
    OR?: Maybe<Array<FolderScalarWhereInput>>;
    parentId?: Maybe<IntNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type FolderUpdateInput = {
    assets?: Maybe<AssetUpdateManyWithoutFolderInput>;
    children?: Maybe<FolderUpdateManyWithoutParentInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutFolderInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    parent?: Maybe<FolderUpdateOneWithoutChildrenInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpdateManyWithWhereWithoutParentInput = {
    data: FolderUpdateManyMutationInput;
    where: FolderScalarWhereInput;
};
export declare type FolderUpdateManyWithoutParentInput = {
    connect?: Maybe<Array<FolderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<FolderCreateOrConnectWithoutParentInput>>;
    create?: Maybe<Array<FolderCreateWithoutParentInput>>;
    delete?: Maybe<Array<FolderWhereUniqueInput>>;
    deleteMany?: Maybe<Array<FolderScalarWhereInput>>;
    disconnect?: Maybe<Array<FolderWhereUniqueInput>>;
    set?: Maybe<Array<FolderWhereUniqueInput>>;
    update?: Maybe<Array<FolderUpdateWithWhereUniqueWithoutParentInput>>;
    updateMany?: Maybe<Array<FolderUpdateManyWithWhereWithoutParentInput>>;
    upsert?: Maybe<Array<FolderUpsertWithWhereUniqueWithoutParentInput>>;
};
export declare type FolderUpdateOneWithoutAssetsInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutAssetsInput>;
    create?: Maybe<FolderCreateWithoutAssetsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<FolderUpdateWithoutAssetsInput>;
    upsert?: Maybe<FolderUpsertWithoutAssetsInput>;
};
export declare type FolderUpdateOneWithoutChildrenInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutChildrenInput>;
    create?: Maybe<FolderCreateWithoutChildrenInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<FolderUpdateWithoutChildrenInput>;
    upsert?: Maybe<FolderUpsertWithoutChildrenInput>;
};
export declare type FolderUpdateOneWithoutCustomerInput = {
    connect?: Maybe<FolderWhereUniqueInput>;
    connectOrCreate?: Maybe<FolderCreateOrConnectWithoutCustomerInput>;
    create?: Maybe<FolderCreateWithoutCustomerInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<FolderUpdateWithoutCustomerInput>;
    upsert?: Maybe<FolderUpsertWithoutCustomerInput>;
};
export declare type FolderUpdateWithWhereUniqueWithoutParentInput = {
    data: FolderUpdateWithoutParentInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderUpdateWithoutAssetsInput = {
    children?: Maybe<FolderUpdateManyWithoutParentInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutFolderInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    parent?: Maybe<FolderUpdateOneWithoutChildrenInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpdateWithoutChildrenInput = {
    assets?: Maybe<AssetUpdateManyWithoutFolderInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutFolderInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    parent?: Maybe<FolderUpdateOneWithoutChildrenInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpdateWithoutCustomerInput = {
    assets?: Maybe<AssetUpdateManyWithoutFolderInput>;
    children?: Maybe<FolderUpdateManyWithoutParentInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    parent?: Maybe<FolderUpdateOneWithoutChildrenInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpdateWithoutParentInput = {
    assets?: Maybe<AssetUpdateManyWithoutFolderInput>;
    children?: Maybe<FolderUpdateManyWithoutParentInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutFolderInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type FolderUpsertWithWhereUniqueWithoutParentInput = {
    create: FolderCreateWithoutParentInput;
    update: FolderUpdateWithoutParentInput;
    where: FolderWhereUniqueInput;
};
export declare type FolderUpsertWithoutAssetsInput = {
    create: FolderCreateWithoutAssetsInput;
    update: FolderUpdateWithoutAssetsInput;
};
export declare type FolderUpsertWithoutChildrenInput = {
    create: FolderCreateWithoutChildrenInput;
    update: FolderUpdateWithoutChildrenInput;
};
export declare type FolderUpsertWithoutCustomerInput = {
    create: FolderCreateWithoutCustomerInput;
    update: FolderUpdateWithoutCustomerInput;
};
export declare type FolderWhereInput = {
    AND?: Maybe<Array<FolderWhereInput>>;
    assets?: Maybe<AssetListRelationFilter>;
    children?: Maybe<FolderListRelationFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerTenant?: Maybe<StringNullableFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<FolderWhereInput>>;
    OR?: Maybe<Array<FolderWhereInput>>;
    parent?: Maybe<FolderWhereInput>;
    parentId?: Maybe<IntNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type FolderWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
export declare type IntFilter = {
    equals?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    gte?: Maybe<Scalars['Int']>;
    in?: Maybe<Array<Scalars['Int']>>;
    lt?: Maybe<Scalars['Int']>;
    lte?: Maybe<Scalars['Int']>;
    not?: Maybe<NestedIntFilter>;
    notIn?: Maybe<Array<Scalars['Int']>>;
};
export declare type IntNullableFilter = {
    equals?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    gte?: Maybe<Scalars['Int']>;
    in?: Maybe<Array<Scalars['Int']>>;
    lt?: Maybe<Scalars['Int']>;
    lte?: Maybe<Scalars['Int']>;
    not?: Maybe<NestedIntNullableFilter>;
    notIn?: Maybe<Array<Scalars['Int']>>;
};
/** Invite type */
export declare enum InviteEmailType {
    HomePage = "HOME_PAGE",
    Video = "VIDEO"
}
export declare type JsonNullableFilter = {
    equals?: Maybe<Scalars['Json']>;
    not?: Maybe<Scalars['Json']>;
};
/** Login History of users */
export declare type LoginHistory = {
    id: Scalars['Int'];
    loggedInAt: Scalars['DateTime'];
    user: User;
    userId: Scalars['Int'];
};
export declare type LoginHistoryCreateInput = {
    loggedInAt: Scalars['DateTime'];
    user: UserCreateNestedOneWithoutLoginHistoryInput;
};
export declare type LoginHistoryCreateNestedManyWithoutUserInput = {
    connect?: Maybe<Array<LoginHistoryWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<LoginHistoryCreateOrConnectWithoutUserInput>>;
    create?: Maybe<Array<LoginHistoryCreateWithoutUserInput>>;
};
export declare type LoginHistoryCreateOrConnectWithoutUserInput = {
    create: LoginHistoryCreateWithoutUserInput;
    where: LoginHistoryWhereUniqueInput;
};
export declare type LoginHistoryCreateWithoutUserInput = {
    loggedInAt: Scalars['DateTime'];
};
export declare type LoginHistoryListRelationFilter = {
    every?: Maybe<LoginHistoryWhereInput>;
    none?: Maybe<LoginHistoryWhereInput>;
    some?: Maybe<LoginHistoryWhereInput>;
};
export declare type LoginHistoryOrderByInput = {
    id?: Maybe<SortOrder>;
    loggedInAt?: Maybe<SortOrder>;
    user?: Maybe<UserOrderByInput>;
    userId?: Maybe<SortOrder>;
};
export declare type LoginHistoryScalarWhereInput = {
    AND?: Maybe<Array<LoginHistoryScalarWhereInput>>;
    id?: Maybe<IntFilter>;
    loggedInAt?: Maybe<DateTimeFilter>;
    NOT?: Maybe<Array<LoginHistoryScalarWhereInput>>;
    OR?: Maybe<Array<LoginHistoryScalarWhereInput>>;
    userId?: Maybe<IntFilter>;
};
export declare type LoginHistoryUpdateInput = {
    loggedInAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    user?: Maybe<UserUpdateOneRequiredWithoutLoginHistoryInput>;
};
export declare type LoginHistoryUpdateManyMutationInput = {
    loggedInAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type LoginHistoryUpdateManyWithWhereWithoutUserInput = {
    data: LoginHistoryUpdateManyMutationInput;
    where: LoginHistoryScalarWhereInput;
};
export declare type LoginHistoryUpdateManyWithoutUserInput = {
    connect?: Maybe<Array<LoginHistoryWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<LoginHistoryCreateOrConnectWithoutUserInput>>;
    create?: Maybe<Array<LoginHistoryCreateWithoutUserInput>>;
    delete?: Maybe<Array<LoginHistoryWhereUniqueInput>>;
    deleteMany?: Maybe<Array<LoginHistoryScalarWhereInput>>;
    disconnect?: Maybe<Array<LoginHistoryWhereUniqueInput>>;
    set?: Maybe<Array<LoginHistoryWhereUniqueInput>>;
    update?: Maybe<Array<LoginHistoryUpdateWithWhereUniqueWithoutUserInput>>;
    updateMany?: Maybe<Array<LoginHistoryUpdateManyWithWhereWithoutUserInput>>;
    upsert?: Maybe<Array<LoginHistoryUpsertWithWhereUniqueWithoutUserInput>>;
};
export declare type LoginHistoryUpdateWithWhereUniqueWithoutUserInput = {
    data: LoginHistoryUpdateWithoutUserInput;
    where: LoginHistoryWhereUniqueInput;
};
export declare type LoginHistoryUpdateWithoutUserInput = {
    loggedInAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type LoginHistoryUpsertWithWhereUniqueWithoutUserInput = {
    create: LoginHistoryCreateWithoutUserInput;
    update: LoginHistoryUpdateWithoutUserInput;
    where: LoginHistoryWhereUniqueInput;
};
export declare type LoginHistoryWhereInput = {
    AND?: Maybe<Array<LoginHistoryWhereInput>>;
    id?: Maybe<IntFilter>;
    loggedInAt?: Maybe<DateTimeFilter>;
    NOT?: Maybe<Array<LoginHistoryWhereInput>>;
    OR?: Maybe<Array<LoginHistoryWhereInput>>;
    user?: Maybe<UserWhereInput>;
    userId?: Maybe<IntFilter>;
};
export declare type LoginHistoryWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
/** Master Template */
export declare type MasterTemplate = {
    createdAt: Scalars['DateTime'];
    customer: Customer;
    customerId: Scalars['Int'];
    flavor: TemplateFlavor;
    id: Scalars['Int'];
    layers: Scalars['Json'];
    updatedAt: Scalars['DateTime'];
};
export declare type MasterTemplateCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutMappingsInput;
    flavor: TemplateFlavor;
    layers: Scalars['Json'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type MasterTemplateCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<MasterTemplateWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<MasterTemplateCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<MasterTemplateCreateWithoutCustomerInput>>;
};
export declare type MasterTemplateCreateOrConnectWithoutCustomerInput = {
    create: MasterTemplateCreateWithoutCustomerInput;
    where: MasterTemplateWhereUniqueInput;
};
export declare type MasterTemplateCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    flavor: TemplateFlavor;
    layers: Scalars['Json'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type MasterTemplateCustomerIdFlavorCompoundUniqueInput = {
    customerId: Scalars['Int'];
    flavor: TemplateFlavor;
};
export declare type MasterTemplateListRelationFilter = {
    every?: Maybe<MasterTemplateWhereInput>;
    none?: Maybe<MasterTemplateWhereInput>;
    some?: Maybe<MasterTemplateWhereInput>;
};
export declare type MasterTemplateOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerId?: Maybe<SortOrder>;
    flavor?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    layers?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare type MasterTemplateScalarWhereInput = {
    AND?: Maybe<Array<MasterTemplateScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerId?: Maybe<IntFilter>;
    flavor?: Maybe<EnumTemplateFlavorFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<MasterTemplateScalarWhereInput>>;
    OR?: Maybe<Array<MasterTemplateScalarWhereInput>>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type MasterTemplateUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutMappingsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    layers?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type MasterTemplateUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    layers?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type MasterTemplateUpdateManyWithWhereWithoutCustomerInput = {
    data: MasterTemplateUpdateManyMutationInput;
    where: MasterTemplateScalarWhereInput;
};
export declare type MasterTemplateUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<MasterTemplateWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<MasterTemplateCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<MasterTemplateCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<MasterTemplateWhereUniqueInput>>;
    deleteMany?: Maybe<Array<MasterTemplateScalarWhereInput>>;
    disconnect?: Maybe<Array<MasterTemplateWhereUniqueInput>>;
    set?: Maybe<Array<MasterTemplateWhereUniqueInput>>;
    update?: Maybe<Array<MasterTemplateUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<MasterTemplateUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<MasterTemplateUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type MasterTemplateUpdateWithWhereUniqueWithoutCustomerInput = {
    data: MasterTemplateUpdateWithoutCustomerInput;
    where: MasterTemplateWhereUniqueInput;
};
export declare type MasterTemplateUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    layers?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type MasterTemplateUpsertWithWhereUniqueWithoutCustomerInput = {
    create: MasterTemplateCreateWithoutCustomerInput;
    update: MasterTemplateUpdateWithoutCustomerInput;
    where: MasterTemplateWhereUniqueInput;
};
export declare type MasterTemplateWhereInput = {
    AND?: Maybe<Array<MasterTemplateWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerId?: Maybe<IntFilter>;
    flavor?: Maybe<EnumTemplateFlavorFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<MasterTemplateWhereInput>>;
    OR?: Maybe<Array<MasterTemplateWhereInput>>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type MasterTemplateWhereUniqueInput = {
    customerId_flavor?: Maybe<MasterTemplateCustomerIdFlavorCompoundUniqueInput>;
    id?: Maybe<Scalars['Int']>;
};
export declare type MonthlyActiveUsers = {
    monthlyActiveUsers?: Maybe<Scalars['Int']>;
};
export declare type Mutation = {
    acceptRequest?: Maybe<Script>;
    activateCustomer?: Maybe<Customer>;
    assetUploadNew?: Maybe<Asset>;
    changeRequestOwner?: Maybe<Request>;
    createOneAsset: Asset;
    createOneCustomer: Customer;
    createOneCustomerOrder: Order;
    createOneCustomerRequest: Request;
    createOneFolder: Folder;
    createOneLoginHistory: LoginHistory;
    createOneMasterTemplate: MasterTemplate;
    createOneOrder: Order;
    createOnePlatform: Platform;
    createOneRender: Render;
    createOneRequest: Request;
    createOneRequestLog: RequestLog;
    createOneScript: Script;
    createOneSub: Sub;
    createOneUser: User;
    createOneVideo: Video;
    createRender?: Maybe<Render>;
    createScript?: Maybe<Script>;
    createVideo?: Maybe<Video>;
    customerScriptEdit?: Maybe<Script>;
    /** Delete an asset by public_id. */
    deleteAsset?: Maybe<CloudinaryDeletedAsset>;
    deleteManyCustomer: AffectedRowsOutput;
    deleteManyFolder: AffectedRowsOutput;
    deleteManyLoginHistory: AffectedRowsOutput;
    deleteManyOrder: AffectedRowsOutput;
    deleteManyPlatform: AffectedRowsOutput;
    deleteManyRender: AffectedRowsOutput;
    deleteManyScript: AffectedRowsOutput;
    deleteManySub: AffectedRowsOutput;
    deleteManyUser: AffectedRowsOutput;
    deleteManyVideo: AffectedRowsOutput;
    deleteOneAsset?: Maybe<Asset>;
    deleteOneCustomer?: Maybe<Customer>;
    deleteOneFolder?: Maybe<Folder>;
    deleteOneLoginHistory?: Maybe<LoginHistory>;
    deleteOneOrder?: Maybe<Order>;
    deleteOnePlatform?: Maybe<Platform>;
    deleteOneRender?: Maybe<Render>;
    deleteOneRequest?: Maybe<Request>;
    deleteOneRequestLog?: Maybe<RequestLog>;
    deleteOneScript?: Maybe<Script>;
    deleteOneSub?: Maybe<Sub>;
    deleteOneUser?: Maybe<User>;
    deleteOneVideo?: Maybe<Video>;
    forgotPassword?: Maybe<Success>;
    login?: Maybe<Token>;
    publishVideo?: Maybe<Video>;
    returnRequestToSubmissionQueue?: Maybe<Request>;
    sendOnBoardingEmail: User;
    sendSurveyData?: Maybe<Customer>;
    sendTeammateInvitations?: Maybe<User>;
    /** Update the public_id and/or tags for a Cloudinary asset. */
    updateAsset?: Maybe<CloudinaryGetAsset>;
    updateManyCustomer: AffectedRowsOutput;
    updateManyFolder: AffectedRowsOutput;
    updateManyLoginHistory: AffectedRowsOutput;
    updateManyOrder: AffectedRowsOutput;
    updateManyPlatform: AffectedRowsOutput;
    updateManyRender: AffectedRowsOutput;
    updateManyScript: AffectedRowsOutput;
    updateManySub: AffectedRowsOutput;
    updateManyVideo: AffectedRowsOutput;
    updateMe?: Maybe<User>;
    updateOneAsset?: Maybe<Asset>;
    updateOneCustomer?: Maybe<Customer>;
    updateOneCustomerOrder?: Maybe<Order>;
    updateOneCustomerRequest?: Maybe<Request>;
    updateOneCustomerVideo?: Maybe<Video>;
    updateOneFolder?: Maybe<Folder>;
    updateOneLoginHistory?: Maybe<LoginHistory>;
    updateOneMasterTemplate?: Maybe<MasterTemplate>;
    updateOneOrder?: Maybe<Order>;
    updateOnePlatform?: Maybe<Platform>;
    updateOneRender?: Maybe<Render>;
    updateOneRequest?: Maybe<Request>;
    updateOneRequestLog?: Maybe<RequestLog>;
    updateOneScript?: Maybe<Script>;
    updateOneSub?: Maybe<Sub>;
    updateOneUser?: Maybe<User>;
    updateOneVideo?: Maybe<Video>;
    updateRender?: Maybe<Render>;
    updateThumbnail?: Maybe<Video>;
    updateUrl?: Maybe<Request>;
    updateUserPermissions?: Maybe<User>;
    updateVideoName?: Maybe<Video>;
    upsertOneScript: Script;
    userSignUp?: Maybe<UserSignUpAndToken>;
    userSignUpWithCustomer?: Maybe<UserSignUpWithCustomerAndToken>;
};
export declare type MutationAcceptRequestArgs = {
    where: RequestWhereUniqueInput;
};
export declare type MutationActivateCustomerArgs = {
    where: CustomerWhereUniqueInput;
};
export declare type MutationAssetUploadNewArgs = {
    file: Scalars['Upload'];
};
export declare type MutationChangeRequestOwnerArgs = {
    whereRequest: RequestWhereUniqueInput;
    whereUser?: Maybe<UserWhereUniqueInput>;
};
export declare type MutationCreateOneAssetArgs = {
    data: AssetCreateInput;
};
export declare type MutationCreateOneCustomerArgs = {
    data: CustomerCreateInput;
};
export declare type MutationCreateOneCustomerOrderArgs = {
    data: OrderCreateInput;
};
export declare type MutationCreateOneCustomerRequestArgs = {
    data: RequestCreateInput;
};
export declare type MutationCreateOneFolderArgs = {
    data: FolderCreateInput;
};
export declare type MutationCreateOneLoginHistoryArgs = {
    data: LoginHistoryCreateInput;
};
export declare type MutationCreateOneMasterTemplateArgs = {
    data: MasterTemplateCreateInput;
};
export declare type MutationCreateOneOrderArgs = {
    data: OrderCreateInput;
};
export declare type MutationCreateOnePlatformArgs = {
    data: PlatformCreateInput;
};
export declare type MutationCreateOneRenderArgs = {
    data: RenderCreateInput;
};
export declare type MutationCreateOneRequestArgs = {
    data: RequestCreateInput;
};
export declare type MutationCreateOneRequestLogArgs = {
    data: RequestLogCreateInput;
};
export declare type MutationCreateOneScriptArgs = {
    data: ScriptCreateInput;
};
export declare type MutationCreateOneSubArgs = {
    data: SubCreateInput;
};
export declare type MutationCreateOneUserArgs = {
    data: UserCreateInput;
};
export declare type MutationCreateOneVideoArgs = {
    data: VideoCreateInput;
};
export declare type MutationCreateRenderArgs = {
    data: RenderCreateInput;
};
export declare type MutationCreateScriptArgs = {
    data: ScriptCreateInput;
};
export declare type MutationCreateVideoArgs = {
    data: VideoCreateInput;
};
export declare type MutationCustomerScriptEditArgs = {
    customerId: Scalars['Int'];
    userId: Scalars['Int'];
    where: ScriptWhereUniqueInput;
};
export declare type MutationDeleteAssetArgs = {
    params: CloudinaryAssetDeleteInput;
};
export declare type MutationDeleteManyCustomerArgs = {
    where?: Maybe<CustomerWhereInput>;
};
export declare type MutationDeleteManyFolderArgs = {
    where?: Maybe<FolderWhereInput>;
};
export declare type MutationDeleteManyLoginHistoryArgs = {
    where?: Maybe<LoginHistoryWhereInput>;
};
export declare type MutationDeleteManyOrderArgs = {
    where?: Maybe<OrderWhereInput>;
};
export declare type MutationDeleteManyPlatformArgs = {
    where?: Maybe<PlatformWhereInput>;
};
export declare type MutationDeleteManyRenderArgs = {
    where?: Maybe<RenderWhereInput>;
};
export declare type MutationDeleteManyScriptArgs = {
    where?: Maybe<ScriptWhereInput>;
};
export declare type MutationDeleteManySubArgs = {
    where?: Maybe<SubWhereInput>;
};
export declare type MutationDeleteManyUserArgs = {
    where?: Maybe<UserWhereInput>;
};
export declare type MutationDeleteManyVideoArgs = {
    where?: Maybe<VideoWhereInput>;
};
export declare type MutationDeleteOneAssetArgs = {
    where: AssetWhereUniqueInput;
};
export declare type MutationDeleteOneCustomerArgs = {
    where: CustomerWhereUniqueInput;
};
export declare type MutationDeleteOneFolderArgs = {
    where: FolderWhereUniqueInput;
};
export declare type MutationDeleteOneLoginHistoryArgs = {
    where: LoginHistoryWhereUniqueInput;
};
export declare type MutationDeleteOneOrderArgs = {
    where: OrderWhereUniqueInput;
};
export declare type MutationDeleteOnePlatformArgs = {
    where: PlatformWhereUniqueInput;
};
export declare type MutationDeleteOneRenderArgs = {
    where: RenderWhereUniqueInput;
};
export declare type MutationDeleteOneRequestArgs = {
    where: RequestWhereUniqueInput;
};
export declare type MutationDeleteOneRequestLogArgs = {
    where: RequestLogWhereUniqueInput;
};
export declare type MutationDeleteOneScriptArgs = {
    where: ScriptWhereUniqueInput;
};
export declare type MutationDeleteOneSubArgs = {
    where: SubWhereUniqueInput;
};
export declare type MutationDeleteOneUserArgs = {
    where: UserWhereUniqueInput;
};
export declare type MutationDeleteOneVideoArgs = {
    where: VideoWhereUniqueInput;
};
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationLoginArgs = {
    email: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationPublishVideoArgs = {
    id: Scalars['Int'];
    live: Scalars['Boolean'];
};
export declare type MutationReturnRequestToSubmissionQueueArgs = {
    where: RequestWhereUniqueInput;
};
export declare type MutationSendOnBoardingEmailArgs = {
    authId: Scalars['String'];
};
export declare type MutationSendSurveyDataArgs = {
    attractTalent: Scalars['String'];
    brandReflection: Scalars['String'];
    comments: Scalars['String'];
    compelling: Scalars['String'];
    where: CustomerWhereUniqueInput;
};
export declare type MutationSendTeammateInvitationsArgs = {
    authId: Scalars['String'];
    customer: Scalars['String'];
    emails?: Maybe<Array<Scalars['String']>>;
    type: InviteEmailType;
};
export declare type MutationUpdateAssetArgs = {
    params: CloudinaryAssetUpdateInput;
};
export declare type MutationUpdateManyCustomerArgs = {
    data: CustomerUpdateManyMutationInput;
    where?: Maybe<CustomerWhereInput>;
};
export declare type MutationUpdateManyFolderArgs = {
    data: FolderUpdateManyMutationInput;
    where?: Maybe<FolderWhereInput>;
};
export declare type MutationUpdateManyLoginHistoryArgs = {
    data: LoginHistoryUpdateManyMutationInput;
    where?: Maybe<LoginHistoryWhereInput>;
};
export declare type MutationUpdateManyOrderArgs = {
    data: OrderUpdateManyMutationInput;
    where?: Maybe<OrderWhereInput>;
};
export declare type MutationUpdateManyPlatformArgs = {
    data: PlatformUpdateManyMutationInput;
    where?: Maybe<PlatformWhereInput>;
};
export declare type MutationUpdateManyRenderArgs = {
    data: RenderUpdateManyMutationInput;
    where?: Maybe<RenderWhereInput>;
};
export declare type MutationUpdateManyScriptArgs = {
    data: ScriptUpdateManyMutationInput;
    where?: Maybe<ScriptWhereInput>;
};
export declare type MutationUpdateManySubArgs = {
    data: SubUpdateManyMutationInput;
    where?: Maybe<SubWhereInput>;
};
export declare type MutationUpdateManyVideoArgs = {
    data: VideoUpdateManyMutationInput;
    where?: Maybe<VideoWhereInput>;
};
export declare type MutationUpdateMeArgs = {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type MutationUpdateOneAssetArgs = {
    data: AssetUpdateInput;
    where: AssetWhereUniqueInput;
};
export declare type MutationUpdateOneCustomerArgs = {
    data: CustomerUpdateInput;
    where: CustomerWhereUniqueInput;
};
export declare type MutationUpdateOneCustomerOrderArgs = {
    data: OrderUpdateInput;
    where: OrderWhereUniqueInput;
};
export declare type MutationUpdateOneCustomerRequestArgs = {
    data: RequestUpdateInput;
    where: RequestWhereUniqueInput;
};
export declare type MutationUpdateOneCustomerVideoArgs = {
    data: VideoUpdateInput;
    where: VideoWhereUniqueInput;
};
export declare type MutationUpdateOneFolderArgs = {
    data: FolderUpdateInput;
    where: FolderWhereUniqueInput;
};
export declare type MutationUpdateOneLoginHistoryArgs = {
    data: LoginHistoryUpdateInput;
    where: LoginHistoryWhereUniqueInput;
};
export declare type MutationUpdateOneMasterTemplateArgs = {
    data: MasterTemplateUpdateInput;
    where: MasterTemplateWhereUniqueInput;
};
export declare type MutationUpdateOneOrderArgs = {
    data: OrderUpdateInput;
    where: OrderWhereUniqueInput;
};
export declare type MutationUpdateOnePlatformArgs = {
    data: PlatformUpdateInput;
    where: PlatformWhereUniqueInput;
};
export declare type MutationUpdateOneRenderArgs = {
    data: RenderUpdateInput;
    where: RenderWhereUniqueInput;
};
export declare type MutationUpdateOneRequestArgs = {
    data: RequestUpdateInput;
    where: RequestWhereUniqueInput;
};
export declare type MutationUpdateOneRequestLogArgs = {
    data: RequestLogUpdateInput;
    where: RequestLogWhereUniqueInput;
};
export declare type MutationUpdateOneScriptArgs = {
    data: ScriptUpdateInput;
    where: ScriptWhereUniqueInput;
};
export declare type MutationUpdateOneSubArgs = {
    data: SubUpdateInput;
    where: SubWhereUniqueInput;
};
export declare type MutationUpdateOneUserArgs = {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type MutationUpdateOneVideoArgs = {
    data: VideoUpdateInput;
    where: VideoWhereUniqueInput;
};
export declare type MutationUpdateRenderArgs = {
    data: RenderUpdateInput;
    where: RenderWhereUniqueInput;
};
export declare type MutationUpdateThumbnailArgs = {
    id: Scalars['Int'];
    time?: Maybe<Scalars['Float']>;
};
export declare type MutationUpdateUrlArgs = {
    data: RequestUpdateInput;
    where: RequestWhereUniqueInput;
};
export declare type MutationUpdateUserPermissionsArgs = {
    authId: Scalars['String'];
    customerTenant: Scalars['String'];
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    role?: Maybe<Array<Maybe<PermissionsRole>>>;
};
export declare type MutationUpdateVideoNameArgs = {
    data: VideoUpdateInput;
    where: VideoWhereUniqueInput;
};
export declare type MutationUpsertOneScriptArgs = {
    create: ScriptCreateInput;
    update: ScriptUpdateInput;
    where: ScriptWhereUniqueInput;
};
export declare type MutationUserSignUpArgs = {
    email: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationUserSignUpWithCustomerArgs = {
    customerName: Scalars['String'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    jobTitle: Scalars['String'];
    jobURL: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    template: Scalars['String'];
    tenant?: Maybe<Scalars['String']>;
};
export declare type NestedBigIntNullableFilter = {
    equals?: Maybe<Scalars['BigInt']>;
    gt?: Maybe<Scalars['BigInt']>;
    gte?: Maybe<Scalars['BigInt']>;
    in?: Maybe<Array<Scalars['BigInt']>>;
    lt?: Maybe<Scalars['BigInt']>;
    lte?: Maybe<Scalars['BigInt']>;
    not?: Maybe<NestedBigIntNullableFilter>;
    notIn?: Maybe<Array<Scalars['BigInt']>>;
};
export declare type NestedBoolFilter = {
    equals?: Maybe<Scalars['Boolean']>;
    not?: Maybe<NestedBoolFilter>;
};
export declare type NestedBoolNullableFilter = {
    equals?: Maybe<Scalars['Boolean']>;
    not?: Maybe<NestedBoolNullableFilter>;
};
export declare type NestedDateTimeFilter = {
    equals?: Maybe<Scalars['DateTime']>;
    gt?: Maybe<Scalars['DateTime']>;
    gte?: Maybe<Scalars['DateTime']>;
    in?: Maybe<Array<Scalars['DateTime']>>;
    lt?: Maybe<Scalars['DateTime']>;
    lte?: Maybe<Scalars['DateTime']>;
    not?: Maybe<NestedDateTimeFilter>;
    notIn?: Maybe<Array<Scalars['DateTime']>>;
};
export declare type NestedDateTimeNullableFilter = {
    equals?: Maybe<Scalars['DateTime']>;
    gt?: Maybe<Scalars['DateTime']>;
    gte?: Maybe<Scalars['DateTime']>;
    in?: Maybe<Array<Scalars['DateTime']>>;
    lt?: Maybe<Scalars['DateTime']>;
    lte?: Maybe<Scalars['DateTime']>;
    not?: Maybe<NestedDateTimeNullableFilter>;
    notIn?: Maybe<Array<Scalars['DateTime']>>;
};
export declare type NestedEnumAssetTypeFilter = {
    equals?: Maybe<AssetType>;
    in?: Maybe<Array<AssetType>>;
    not?: Maybe<NestedEnumAssetTypeFilter>;
    notIn?: Maybe<Array<AssetType>>;
};
export declare type NestedEnumOrderStatusFilter = {
    equals?: Maybe<OrderStatus>;
    in?: Maybe<Array<OrderStatus>>;
    not?: Maybe<NestedEnumOrderStatusFilter>;
    notIn?: Maybe<Array<OrderStatus>>;
};
export declare type NestedEnumRenderStatusFilter = {
    equals?: Maybe<RenderStatus>;
    in?: Maybe<Array<RenderStatus>>;
    not?: Maybe<NestedEnumRenderStatusFilter>;
    notIn?: Maybe<Array<RenderStatus>>;
};
export declare type NestedEnumRequestLogsEventFilter = {
    equals?: Maybe<RequestLogsEvent>;
    in?: Maybe<Array<RequestLogsEvent>>;
    not?: Maybe<NestedEnumRequestLogsEventFilter>;
    notIn?: Maybe<Array<RequestLogsEvent>>;
};
export declare type NestedEnumRequestStatusFilter = {
    equals?: Maybe<RequestStatus>;
    in?: Maybe<Array<RequestStatus>>;
    not?: Maybe<NestedEnumRequestStatusFilter>;
    notIn?: Maybe<Array<RequestStatus>>;
};
export declare type NestedEnumTemplateFlavorFilter = {
    equals?: Maybe<TemplateFlavor>;
    in?: Maybe<Array<TemplateFlavor>>;
    not?: Maybe<NestedEnumTemplateFlavorFilter>;
    notIn?: Maybe<Array<TemplateFlavor>>;
};
export declare type NestedEnumTemplateFlavorNullableFilter = {
    equals?: Maybe<TemplateFlavor>;
    in?: Maybe<Array<TemplateFlavor>>;
    not?: Maybe<NestedEnumTemplateFlavorNullableFilter>;
    notIn?: Maybe<Array<TemplateFlavor>>;
};
export declare type NestedEnumVideoStatusNullableFilter = {
    equals?: Maybe<VideoStatus>;
    in?: Maybe<Array<VideoStatus>>;
    not?: Maybe<NestedEnumVideoStatusNullableFilter>;
    notIn?: Maybe<Array<VideoStatus>>;
};
export declare type NestedIntFilter = {
    equals?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    gte?: Maybe<Scalars['Int']>;
    in?: Maybe<Array<Scalars['Int']>>;
    lt?: Maybe<Scalars['Int']>;
    lte?: Maybe<Scalars['Int']>;
    not?: Maybe<NestedIntFilter>;
    notIn?: Maybe<Array<Scalars['Int']>>;
};
export declare type NestedIntNullableFilter = {
    equals?: Maybe<Scalars['Int']>;
    gt?: Maybe<Scalars['Int']>;
    gte?: Maybe<Scalars['Int']>;
    in?: Maybe<Array<Scalars['Int']>>;
    lt?: Maybe<Scalars['Int']>;
    lte?: Maybe<Scalars['Int']>;
    not?: Maybe<NestedIntNullableFilter>;
    notIn?: Maybe<Array<Scalars['Int']>>;
};
export declare type NestedStringFilter = {
    contains?: Maybe<Scalars['String']>;
    endsWith?: Maybe<Scalars['String']>;
    equals?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    gte?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    lt?: Maybe<Scalars['String']>;
    lte?: Maybe<Scalars['String']>;
    not?: Maybe<NestedStringFilter>;
    notIn?: Maybe<Array<Scalars['String']>>;
    startsWith?: Maybe<Scalars['String']>;
};
export declare type NestedStringNullableFilter = {
    contains?: Maybe<Scalars['String']>;
    endsWith?: Maybe<Scalars['String']>;
    equals?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    gte?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    lt?: Maybe<Scalars['String']>;
    lte?: Maybe<Scalars['String']>;
    not?: Maybe<NestedStringNullableFilter>;
    notIn?: Maybe<Array<Scalars['String']>>;
    startsWith?: Maybe<Scalars['String']>;
};
export declare type NullableBigIntFieldUpdateOperationsInput = {
    decrement?: Maybe<Scalars['BigInt']>;
    divide?: Maybe<Scalars['BigInt']>;
    increment?: Maybe<Scalars['BigInt']>;
    multiply?: Maybe<Scalars['BigInt']>;
    set?: Maybe<Scalars['BigInt']>;
};
export declare type NullableBoolFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['Boolean']>;
};
export declare type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['DateTime']>;
};
export declare type NullableEnumTemplateFlavorFieldUpdateOperationsInput = {
    set?: Maybe<TemplateFlavor>;
};
export declare type NullableEnumVideoStatusFieldUpdateOperationsInput = {
    set?: Maybe<VideoStatus>;
};
export declare type NullableIntFieldUpdateOperationsInput = {
    decrement?: Maybe<Scalars['Int']>;
    divide?: Maybe<Scalars['Int']>;
    increment?: Maybe<Scalars['Int']>;
    multiply?: Maybe<Scalars['Int']>;
    set?: Maybe<Scalars['Int']>;
};
export declare type NullableStringFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['String']>;
};
export declare type Order = {
    createdAt: Scalars['DateTime'];
    customer: Customer;
    customerTenant: Scalars['String'];
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    requests: Array<Request>;
    scripts: Array<Script>;
    status: OrderStatus;
    updatedAt: Scalars['DateTime'];
    videos: Array<Video>;
};
export declare type OrderRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type OrderScriptsArgs = {
    cursor?: Maybe<ScriptWhereUniqueInput>;
    orderBy?: Maybe<Array<ScriptOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type OrderVideosArgs = {
    cursor?: Maybe<VideoWhereUniqueInput>;
    orderBy?: Maybe<Array<VideoOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type OrderCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutOrdersInput;
    name?: Maybe<Scalars['String']>;
    requests?: Maybe<RequestCreateNestedManyWithoutOrderInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutOrderInput>;
    status?: Maybe<OrderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    videos?: Maybe<VideoCreateNestedManyWithoutOrderInput>;
};
export declare type OrderCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<OrderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<OrderCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<OrderCreateWithoutCustomerInput>>;
};
export declare type OrderCreateNestedOneWithoutRequestsInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<OrderCreateWithoutRequestsInput>;
};
export declare type OrderCreateNestedOneWithoutScriptsInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<OrderCreateWithoutScriptsInput>;
};
export declare type OrderCreateNestedOneWithoutVideosInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutVideosInput>;
    create?: Maybe<OrderCreateWithoutVideosInput>;
};
export declare type OrderCreateOrConnectWithoutCustomerInput = {
    create: OrderCreateWithoutCustomerInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderCreateOrConnectWithoutRequestsInput = {
    create: OrderCreateWithoutRequestsInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderCreateOrConnectWithoutScriptsInput = {
    create: OrderCreateWithoutScriptsInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderCreateOrConnectWithoutVideosInput = {
    create: OrderCreateWithoutVideosInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    requests?: Maybe<RequestCreateNestedManyWithoutOrderInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutOrderInput>;
    status?: Maybe<OrderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    videos?: Maybe<VideoCreateNestedManyWithoutOrderInput>;
};
export declare type OrderCreateWithoutRequestsInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutOrdersInput;
    name?: Maybe<Scalars['String']>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutOrderInput>;
    status?: Maybe<OrderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    videos?: Maybe<VideoCreateNestedManyWithoutOrderInput>;
};
export declare type OrderCreateWithoutScriptsInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutOrdersInput;
    name?: Maybe<Scalars['String']>;
    requests?: Maybe<RequestCreateNestedManyWithoutOrderInput>;
    status?: Maybe<OrderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    videos?: Maybe<VideoCreateNestedManyWithoutOrderInput>;
};
export declare type OrderCreateWithoutVideosInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutOrdersInput;
    name?: Maybe<Scalars['String']>;
    requests?: Maybe<RequestCreateNestedManyWithoutOrderInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutOrderInput>;
    status?: Maybe<OrderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OrderListRelationFilter = {
    every?: Maybe<OrderWhereInput>;
    none?: Maybe<OrderWhereInput>;
    some?: Maybe<OrderWhereInput>;
};
export declare type OrderOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerTenant?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    status?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare type OrderScalarWhereInput = {
    AND?: Maybe<Array<OrderScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerTenant?: Maybe<StringFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<OrderScalarWhereInput>>;
    OR?: Maybe<Array<OrderScalarWhereInput>>;
    status?: Maybe<EnumOrderStatusFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare enum OrderStatus {
    Completed = "completed",
    InProgress = "inProgress"
}
export declare type OrderUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutOrdersInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    requests?: Maybe<RequestUpdateManyWithoutOrderInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutOrderInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    videos?: Maybe<VideoUpdateManyWithoutOrderInput>;
};
export declare type OrderUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type OrderUpdateManyWithWhereWithoutCustomerInput = {
    data: OrderUpdateManyMutationInput;
    where: OrderScalarWhereInput;
};
export declare type OrderUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<OrderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<OrderCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<OrderCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<OrderWhereUniqueInput>>;
    deleteMany?: Maybe<Array<OrderScalarWhereInput>>;
    disconnect?: Maybe<Array<OrderWhereUniqueInput>>;
    set?: Maybe<Array<OrderWhereUniqueInput>>;
    update?: Maybe<Array<OrderUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<OrderUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<OrderUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type OrderUpdateOneWithoutRequestsInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<OrderCreateWithoutRequestsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<OrderUpdateWithoutRequestsInput>;
    upsert?: Maybe<OrderUpsertWithoutRequestsInput>;
};
export declare type OrderUpdateOneWithoutScriptsInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<OrderCreateWithoutScriptsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<OrderUpdateWithoutScriptsInput>;
    upsert?: Maybe<OrderUpsertWithoutScriptsInput>;
};
export declare type OrderUpdateOneWithoutVideosInput = {
    connect?: Maybe<OrderWhereUniqueInput>;
    connectOrCreate?: Maybe<OrderCreateOrConnectWithoutVideosInput>;
    create?: Maybe<OrderCreateWithoutVideosInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<OrderUpdateWithoutVideosInput>;
    upsert?: Maybe<OrderUpsertWithoutVideosInput>;
};
export declare type OrderUpdateWithWhereUniqueWithoutCustomerInput = {
    data: OrderUpdateWithoutCustomerInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    requests?: Maybe<RequestUpdateManyWithoutOrderInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutOrderInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    videos?: Maybe<VideoUpdateManyWithoutOrderInput>;
};
export declare type OrderUpdateWithoutRequestsInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutOrdersInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutOrderInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    videos?: Maybe<VideoUpdateManyWithoutOrderInput>;
};
export declare type OrderUpdateWithoutScriptsInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutOrdersInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    requests?: Maybe<RequestUpdateManyWithoutOrderInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    videos?: Maybe<VideoUpdateManyWithoutOrderInput>;
};
export declare type OrderUpdateWithoutVideosInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutOrdersInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    requests?: Maybe<RequestUpdateManyWithoutOrderInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutOrderInput>;
    status?: Maybe<EnumOrderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type OrderUpsertWithWhereUniqueWithoutCustomerInput = {
    create: OrderCreateWithoutCustomerInput;
    update: OrderUpdateWithoutCustomerInput;
    where: OrderWhereUniqueInput;
};
export declare type OrderUpsertWithoutRequestsInput = {
    create: OrderCreateWithoutRequestsInput;
    update: OrderUpdateWithoutRequestsInput;
};
export declare type OrderUpsertWithoutScriptsInput = {
    create: OrderCreateWithoutScriptsInput;
    update: OrderUpdateWithoutScriptsInput;
};
export declare type OrderUpsertWithoutVideosInput = {
    create: OrderCreateWithoutVideosInput;
    update: OrderUpdateWithoutVideosInput;
};
export declare type OrderWhereInput = {
    AND?: Maybe<Array<OrderWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerTenant?: Maybe<StringFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<OrderWhereInput>>;
    OR?: Maybe<Array<OrderWhereInput>>;
    requests?: Maybe<RequestListRelationFilter>;
    scripts?: Maybe<ScriptListRelationFilter>;
    status?: Maybe<EnumOrderStatusFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    videos?: Maybe<VideoListRelationFilter>;
};
export declare type OrderWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
/** Admins have read and write access for everything.  User's can read everything for a given customer. Scripters are allowed only for scripting */
export declare enum PermissionsRole {
    Admin = "admin",
    Manager = "manager",
    Scripter = "scripter",
    User = "user"
}
/** ATS type for customer behaviors */
export declare type Platform = {
    createdAt: Scalars['DateTime'];
    customers: Array<Customer>;
    id: Scalars['Int'];
    name: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    url?: Maybe<Scalars['String']>;
};
/** ATS type for customer behaviors */
export declare type PlatformCustomersArgs = {
    cursor?: Maybe<CustomerWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type PlatformCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutPlatformInput>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
export declare type PlatformCreateNestedOneWithoutCustomersInput = {
    connect?: Maybe<PlatformWhereUniqueInput>;
    connectOrCreate?: Maybe<PlatformCreateOrConnectWithoutCustomersInput>;
    create?: Maybe<PlatformCreateWithoutCustomersInput>;
};
export declare type PlatformCreateOrConnectWithoutCustomersInput = {
    create: PlatformCreateWithoutCustomersInput;
    where: PlatformWhereUniqueInput;
};
export declare type PlatformCreateWithoutCustomersInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
export declare type PlatformOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    url?: Maybe<SortOrder>;
};
export declare type PlatformUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutPlatformInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type PlatformUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type PlatformUpdateOneWithoutCustomersInput = {
    connect?: Maybe<PlatformWhereUniqueInput>;
    connectOrCreate?: Maybe<PlatformCreateOrConnectWithoutCustomersInput>;
    create?: Maybe<PlatformCreateWithoutCustomersInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<PlatformUpdateWithoutCustomersInput>;
    upsert?: Maybe<PlatformUpsertWithoutCustomersInput>;
};
export declare type PlatformUpdateWithoutCustomersInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type PlatformUpsertWithoutCustomersInput = {
    create: PlatformCreateWithoutCustomersInput;
    update: PlatformUpdateWithoutCustomersInput;
};
export declare type PlatformWhereInput = {
    AND?: Maybe<Array<PlatformWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customers?: Maybe<CustomerListRelationFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringFilter>;
    NOT?: Maybe<Array<PlatformWhereInput>>;
    OR?: Maybe<Array<PlatformWhereInput>>;
    updatedAt?: Maybe<DateTimeFilter>;
    url?: Maybe<StringNullableFilter>;
};
export declare type PlatformWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
};
export declare type PublicVideo = {
    embedJobPage?: Maybe<Scalars['Boolean']>;
    id: Scalars['Int'];
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    /** Return the thumbnail Vimeo video. */
    thumbnail?: Maybe<Scalars['String']>;
    vanityButtonText: Scalars['String'];
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type Query = {
    asset?: Maybe<Asset>;
    assets: Array<Asset>;
    /** Return the average time requests beween a given date range take from created at to completed at in milliseconds. */
    avgRequestCompletion?: Maybe<Scalars['Float']>;
    customer?: Maybe<Customer>;
    customers: Array<Customer>;
    dailyActiveUsers?: Maybe<DailyActiveUsers>;
    flavor?: Maybe<Scalars['JSON']>;
    flavors?: Maybe<Scalars['JSON']>;
    flavorsMultiple?: Maybe<Scalars['JSON']>;
    folder?: Maybe<Folder>;
    folders: Array<Folder>;
    /** Returns a cloudinary asset based on publicId. */
    getAsset?: Maybe<CloudinaryGetAsset>;
    /** Returns a paginated list of cloudinary assets that match current search parameters. */
    getAssets?: Maybe<CloudinaryAssets>;
    /** Returns a paginated list of all tags used for all images stored in cloudinary. */
    getAssetTags?: Maybe<CloudinaryTags>;
    getCustomer?: Maybe<Customer>;
    getCustomerOrder?: Maybe<Order>;
    getCustomerOrders: Array<Order>;
    getCustomerRequest?: Maybe<Request>;
    getCustomerRequests: Array<Request>;
    getCustomerVideo?: Maybe<Video>;
    getCustomerVideos: Array<Video>;
    /** Returns a signature to use with the Cloudinary Upload Widget. */
    getUploadSignature: UploadSignature;
    /** Get video by short 4 (or a little longer some day) letter hash. */
    getVideoByHash?: Maybe<PublicVideo>;
    /** Get video by short 4 (or a little longer some day) letter hash. */
    getVideoByShortId?: Maybe<Video>;
    loginHistories: Array<LoginHistory>;
    loginHistory?: Maybe<LoginHistory>;
    masterTemplate?: Maybe<MasterTemplate>;
    masterTemplates: Array<MasterTemplate>;
    me?: Maybe<User>;
    monthlyActiveUsers?: Maybe<MonthlyActiveUsers>;
    order?: Maybe<Order>;
    orders: Array<Order>;
    platform?: Maybe<Platform>;
    platforms: Array<Platform>;
    publicVideo?: Maybe<PublicVideo>;
    render?: Maybe<Render>;
    renders: Array<Render>;
    request?: Maybe<Request>;
    requestLog?: Maybe<RequestLog>;
    requestLogs: Array<RequestLog>;
    requests: Array<Request>;
    script?: Maybe<Script>;
    scripts: Array<Script>;
    sub?: Maybe<Sub>;
    subs: Array<Sub>;
    test?: Maybe<Scalars['Boolean']>;
    /** Total number of assets for use with pagination. */
    totalAssets?: Maybe<Count>;
    /** Total number of customers for use with pagination. */
    totalCustomers?: Maybe<Count>;
    /** Total number of orders for use with pagination. */
    totalOrders?: Maybe<Count>;
    /** Total number of customers for use with pagination. */
    totalPlatforms?: Maybe<Count>;
    /** Total number of jobs for use with pagination. */
    totalRequests?: Maybe<Count>;
    /** Total number of jobs for use with pagination. */
    totalScripts?: Maybe<Count>;
    /** Total number of subscriptions for use with pagination. */
    totalSubs?: Maybe<Count>;
    /** Total number of users for use with pagination. */
    totalUsers?: Maybe<Count>;
    /** Total number of videos for use with pagination. */
    totalVideos?: Maybe<Count>;
    user?: Maybe<User>;
    users: Array<User>;
    video?: Maybe<Video>;
    videos: Array<Video>;
};
export declare type QueryAssetArgs = {
    where: AssetWhereUniqueInput;
};
export declare type QueryAssetsArgs = {
    cursor?: Maybe<AssetWhereUniqueInput>;
    orderBy?: Maybe<Array<AssetOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<AssetWhereInput>;
};
export declare type QueryAvgRequestCompletionArgs = {
    end: Scalars['DateTime'];
    start: Scalars['DateTime'];
};
export declare type QueryCustomerArgs = {
    where: CustomerWhereUniqueInput;
};
export declare type QueryCustomersArgs = {
    cursor?: Maybe<CustomerWhereUniqueInput>;
    orderBy?: Maybe<Array<CustomerOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<CustomerWhereInput>;
};
export declare type QueryFlavorArgs = {
    name: TemplateFlavor;
};
export declare type QueryFlavorsMultipleArgs = {
    name: Array<TemplateFlavor>;
};
export declare type QueryFolderArgs = {
    where: FolderWhereUniqueInput;
};
export declare type QueryFoldersArgs = {
    cursor?: Maybe<FolderWhereUniqueInput>;
    orderBy?: Maybe<Array<FolderOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<FolderWhereInput>;
};
export declare type QueryGetAssetArgs = {
    params: CloudinaryGetAssetInput;
};
export declare type QueryGetAssetsArgs = {
    params?: Maybe<CloudinaryGetAssetsInput>;
};
export declare type QueryGetAssetTagsArgs = {
    params?: Maybe<CloudinaryTagsInput>;
};
export declare type QueryGetCustomerArgs = {
    where: CustomerWhereUniqueInput;
};
export declare type QueryGetCustomerOrderArgs = {
    where: OrderWhereUniqueInput;
};
export declare type QueryGetCustomerOrdersArgs = {
    cursor?: Maybe<OrderWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type QueryGetCustomerRequestArgs = {
    where: RequestWhereUniqueInput;
};
export declare type QueryGetCustomerRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<RequestWhereInput>;
};
export declare type QueryGetCustomerVideoArgs = {
    where: VideoWhereUniqueInput;
};
export declare type QueryGetCustomerVideosArgs = {
    cursor?: Maybe<VideoWhereUniqueInput>;
    orderBy?: Maybe<Array<VideoOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<VideoWhereInput>;
};
export declare type QueryGetUploadSignatureArgs = {
    params: UploadSignatureInput;
};
export declare type QueryGetVideoByHashArgs = {
    hash: Scalars['String'];
};
export declare type QueryGetVideoByShortIdArgs = {
    hash: Scalars['String'];
};
export declare type QueryLoginHistoriesArgs = {
    cursor?: Maybe<LoginHistoryWhereUniqueInput>;
    orderBy?: Maybe<Array<LoginHistoryOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<LoginHistoryWhereInput>;
};
export declare type QueryLoginHistoryArgs = {
    where: LoginHistoryWhereUniqueInput;
};
export declare type QueryMasterTemplateArgs = {
    where: MasterTemplateWhereUniqueInput;
};
export declare type QueryMasterTemplatesArgs = {
    cursor?: Maybe<MasterTemplateWhereUniqueInput>;
    orderBy?: Maybe<Array<MasterTemplateOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<MasterTemplateWhereInput>;
};
export declare type QueryMeArgs = {
    where: UserWhereUniqueInput;
};
export declare type QueryOrderArgs = {
    where: OrderWhereUniqueInput;
};
export declare type QueryOrdersArgs = {
    cursor?: Maybe<OrderWhereUniqueInput>;
    orderBy?: Maybe<Array<OrderOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<OrderWhereInput>;
};
export declare type QueryPlatformArgs = {
    where: PlatformWhereUniqueInput;
};
export declare type QueryPlatformsArgs = {
    cursor?: Maybe<PlatformWhereUniqueInput>;
    orderBy?: Maybe<Array<PlatformOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<PlatformWhereInput>;
};
export declare type QueryPublicVideoArgs = {
    where?: Maybe<VideoWhereUniqueInput>;
};
export declare type QueryRenderArgs = {
    where: RenderWhereUniqueInput;
};
export declare type QueryRendersArgs = {
    cursor?: Maybe<RenderWhereUniqueInput>;
    orderBy?: Maybe<Array<RenderOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<RenderWhereInput>;
};
export declare type QueryRequestArgs = {
    where: RequestWhereUniqueInput;
};
export declare type QueryRequestLogArgs = {
    where: RequestLogWhereUniqueInput;
};
export declare type QueryRequestLogsArgs = {
    cursor?: Maybe<RequestLogWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestLogOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<RequestLogWhereInput>;
};
export declare type QueryRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<RequestWhereInput>;
};
export declare type QueryScriptArgs = {
    where: ScriptWhereUniqueInput;
};
export declare type QueryScriptsArgs = {
    cursor?: Maybe<ScriptWhereUniqueInput>;
    orderBy?: Maybe<Array<ScriptOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<ScriptWhereInput>;
};
export declare type QuerySubArgs = {
    where: SubWhereUniqueInput;
};
export declare type QuerySubsArgs = {
    cursor?: Maybe<SubWhereUniqueInput>;
    orderBy?: Maybe<Array<SubOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<SubWhereInput>;
};
export declare type QueryTotalAssetsArgs = {
    where?: Maybe<AssetWhereInput>;
};
export declare type QueryTotalCustomersArgs = {
    where?: Maybe<CustomerWhereInput>;
};
export declare type QueryTotalOrdersArgs = {
    where?: Maybe<OrderWhereInput>;
};
export declare type QueryTotalPlatformsArgs = {
    where?: Maybe<PlatformWhereInput>;
};
export declare type QueryTotalRequestsArgs = {
    where?: Maybe<RequestWhereInput>;
};
export declare type QueryTotalScriptsArgs = {
    where?: Maybe<ScriptWhereInput>;
};
export declare type QueryTotalSubsArgs = {
    where?: Maybe<SubWhereInput>;
};
export declare type QueryTotalUsersArgs = {
    where?: Maybe<UserWhereInput>;
};
export declare type QueryTotalVideosArgs = {
    where?: Maybe<VideoWhereInput>;
};
export declare type QueryUserArgs = {
    where: UserWhereUniqueInput;
};
export declare type QueryUsersArgs = {
    cursor?: Maybe<UserWhereUniqueInput>;
    orderBy?: Maybe<Array<UserOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<UserWhereInput>;
};
export declare type QueryVideoArgs = {
    where: VideoWhereUniqueInput;
};
export declare type QueryVideosArgs = {
    cursor?: Maybe<VideoWhereUniqueInput>;
    orderBy?: Maybe<Array<VideoOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
    where?: Maybe<VideoWhereInput>;
};
export declare enum QueryMode {
    Default = "default",
    Insensitive = "insensitive"
}
export declare type Render = {
    error?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    progress?: Maybe<Scalars['Int']>;
    queuedAt: Scalars['DateTime'];
    script: Script;
    status: RenderStatus;
    updatedAt: Scalars['DateTime'];
    video?: Maybe<Video>;
};
export declare type RenderCreateInput = {
    error?: Maybe<Scalars['String']>;
    progress?: Maybe<Scalars['Int']>;
    queuedAt?: Maybe<Scalars['DateTime']>;
    script: ScriptCreateNestedOneWithoutRendersInput;
    status?: Maybe<RenderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    video?: Maybe<VideoCreateNestedOneWithoutRenderInput>;
};
export declare type RenderCreateNestedManyWithoutScriptInput = {
    connect?: Maybe<Array<RenderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RenderCreateOrConnectWithoutScriptInput>>;
    create?: Maybe<Array<RenderCreateWithoutScriptInput>>;
};
export declare type RenderCreateNestedOneWithoutVideoInput = {
    connect?: Maybe<RenderWhereUniqueInput>;
    connectOrCreate?: Maybe<RenderCreateOrConnectWithoutVideoInput>;
    create?: Maybe<RenderCreateWithoutVideoInput>;
};
export declare type RenderCreateOrConnectWithoutScriptInput = {
    create: RenderCreateWithoutScriptInput;
    where: RenderWhereUniqueInput;
};
export declare type RenderCreateOrConnectWithoutVideoInput = {
    create: RenderCreateWithoutVideoInput;
    where: RenderWhereUniqueInput;
};
export declare type RenderCreateWithoutScriptInput = {
    error?: Maybe<Scalars['String']>;
    progress?: Maybe<Scalars['Int']>;
    queuedAt?: Maybe<Scalars['DateTime']>;
    status?: Maybe<RenderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    video?: Maybe<VideoCreateNestedOneWithoutRenderInput>;
};
export declare type RenderCreateWithoutVideoInput = {
    error?: Maybe<Scalars['String']>;
    progress?: Maybe<Scalars['Int']>;
    queuedAt?: Maybe<Scalars['DateTime']>;
    script: ScriptCreateNestedOneWithoutRendersInput;
    status?: Maybe<RenderStatus>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type RenderListRelationFilter = {
    every?: Maybe<RenderWhereInput>;
    none?: Maybe<RenderWhereInput>;
    some?: Maybe<RenderWhereInput>;
};
export declare type RenderOrderByInput = {
    error?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    progress?: Maybe<SortOrder>;
    queuedAt?: Maybe<SortOrder>;
    script?: Maybe<ScriptOrderByInput>;
    scriptId?: Maybe<SortOrder>;
    status?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    videoId?: Maybe<SortOrder>;
};
export declare type RenderScalarWhereInput = {
    AND?: Maybe<Array<RenderScalarWhereInput>>;
    error?: Maybe<StringNullableFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<RenderScalarWhereInput>>;
    OR?: Maybe<Array<RenderScalarWhereInput>>;
    progress?: Maybe<IntNullableFilter>;
    queuedAt?: Maybe<DateTimeFilter>;
    scriptId?: Maybe<IntFilter>;
    status?: Maybe<EnumRenderStatusFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    videoId?: Maybe<IntNullableFilter>;
};
export declare enum RenderStatus {
    Completed = "completed",
    Errored = "errored",
    Queued = "queued",
    Rendering = "rendering"
}
export declare type RenderUpdateInput = {
    error?: Maybe<NullableStringFieldUpdateOperationsInput>;
    progress?: Maybe<NullableIntFieldUpdateOperationsInput>;
    queuedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    script?: Maybe<ScriptUpdateOneRequiredWithoutRendersInput>;
    status?: Maybe<EnumRenderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutRenderInput>;
};
export declare type RenderUpdateManyMutationInput = {
    error?: Maybe<NullableStringFieldUpdateOperationsInput>;
    progress?: Maybe<NullableIntFieldUpdateOperationsInput>;
    queuedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    status?: Maybe<EnumRenderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type RenderUpdateManyWithWhereWithoutScriptInput = {
    data: RenderUpdateManyMutationInput;
    where: RenderScalarWhereInput;
};
export declare type RenderUpdateManyWithoutScriptInput = {
    connect?: Maybe<Array<RenderWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RenderCreateOrConnectWithoutScriptInput>>;
    create?: Maybe<Array<RenderCreateWithoutScriptInput>>;
    delete?: Maybe<Array<RenderWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RenderScalarWhereInput>>;
    disconnect?: Maybe<Array<RenderWhereUniqueInput>>;
    set?: Maybe<Array<RenderWhereUniqueInput>>;
    update?: Maybe<Array<RenderUpdateWithWhereUniqueWithoutScriptInput>>;
    updateMany?: Maybe<Array<RenderUpdateManyWithWhereWithoutScriptInput>>;
    upsert?: Maybe<Array<RenderUpsertWithWhereUniqueWithoutScriptInput>>;
};
export declare type RenderUpdateOneWithoutVideoInput = {
    connect?: Maybe<RenderWhereUniqueInput>;
    connectOrCreate?: Maybe<RenderCreateOrConnectWithoutVideoInput>;
    create?: Maybe<RenderCreateWithoutVideoInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<RenderUpdateWithoutVideoInput>;
    upsert?: Maybe<RenderUpsertWithoutVideoInput>;
};
export declare type RenderUpdateWithWhereUniqueWithoutScriptInput = {
    data: RenderUpdateWithoutScriptInput;
    where: RenderWhereUniqueInput;
};
export declare type RenderUpdateWithoutScriptInput = {
    error?: Maybe<NullableStringFieldUpdateOperationsInput>;
    progress?: Maybe<NullableIntFieldUpdateOperationsInput>;
    queuedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    status?: Maybe<EnumRenderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutRenderInput>;
};
export declare type RenderUpdateWithoutVideoInput = {
    error?: Maybe<NullableStringFieldUpdateOperationsInput>;
    progress?: Maybe<NullableIntFieldUpdateOperationsInput>;
    queuedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    script?: Maybe<ScriptUpdateOneRequiredWithoutRendersInput>;
    status?: Maybe<EnumRenderStatusFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type RenderUpsertWithWhereUniqueWithoutScriptInput = {
    create: RenderCreateWithoutScriptInput;
    update: RenderUpdateWithoutScriptInput;
    where: RenderWhereUniqueInput;
};
export declare type RenderUpsertWithoutVideoInput = {
    create: RenderCreateWithoutVideoInput;
    update: RenderUpdateWithoutVideoInput;
};
export declare type RenderWhereInput = {
    AND?: Maybe<Array<RenderWhereInput>>;
    error?: Maybe<StringNullableFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<RenderWhereInput>>;
    OR?: Maybe<Array<RenderWhereInput>>;
    progress?: Maybe<IntNullableFilter>;
    queuedAt?: Maybe<DateTimeFilter>;
    script?: Maybe<ScriptWhereInput>;
    scriptId?: Maybe<IntFilter>;
    status?: Maybe<EnumRenderStatusFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    video?: Maybe<VideoWhereInput>;
    videoId?: Maybe<IntNullableFilter>;
};
export declare type RenderWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    videoId?: Maybe<Scalars['Int']>;
};
export declare type Request = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt: Scalars['DateTime'];
    customer: Customer;
    customerTenant: Scalars['String'];
    id: Scalars['Int'];
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs: Array<RequestLog>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<Order>;
    orderId?: Maybe<Scalars['Int']>;
    owner?: Maybe<User>;
    script?: Maybe<Script>;
    slackTs?: Maybe<Scalars['String']>;
    status: RequestStatus;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<User>;
    template?: Maybe<TemplateFlavor>;
    updatedAt: Scalars['DateTime'];
    url?: Maybe<Scalars['String']>;
    video?: Maybe<Video>;
};
export declare type RequestLogsArgs = {
    cursor?: Maybe<RequestLogWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type RequestCreateInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<RequestCreateWithoutCustomerInput>>;
};
export declare type RequestCreateNestedManyWithoutOrderInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<RequestCreateWithoutOrderInput>>;
};
export declare type RequestCreateNestedManyWithoutOwnerInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutOwnerInput>>;
    create?: Maybe<Array<RequestCreateWithoutOwnerInput>>;
};
export declare type RequestCreateNestedManyWithoutSubmittedByInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutSubmittedByInput>>;
    create?: Maybe<Array<RequestCreateWithoutSubmittedByInput>>;
};
export declare type RequestCreateNestedOneWithoutLogsInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutLogsInput>;
    create?: Maybe<RequestCreateWithoutLogsInput>;
};
export declare type RequestCreateNestedOneWithoutScriptInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutScriptInput>;
    create?: Maybe<RequestCreateWithoutScriptInput>;
};
export declare type RequestCreateNestedOneWithoutUsersInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutUsersInput>;
    create?: Maybe<RequestCreateWithoutUsersInput>;
};
export declare type RequestCreateNestedOneWithoutVideoInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutVideoInput>;
    create?: Maybe<RequestCreateWithoutVideoInput>;
};
export declare type RequestCreateOrConnectWithoutCustomerInput = {
    create: RequestCreateWithoutCustomerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutLogsInput = {
    create: RequestCreateWithoutLogsInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutOrderInput = {
    create: RequestCreateWithoutOrderInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutOwnerInput = {
    create: RequestCreateWithoutOwnerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutScriptInput = {
    create: RequestCreateWithoutScriptInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutSubmittedByInput = {
    create: RequestCreateWithoutSubmittedByInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutUsersInput = {
    create: RequestCreateWithoutUsersInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateOrConnectWithoutVideoInput = {
    create: RequestCreateWithoutVideoInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestCreateWithoutCustomerInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutLogsInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutOrderInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutOwnerInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutScriptInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutSubmittedByInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutUsersInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutRequestInput>;
};
export declare type RequestCreateWithoutVideoInput = {
    basePrice?: Maybe<Scalars['Int']>;
    bonusDeadline?: Maybe<Scalars['DateTime']>;
    bonusPrice?: Maybe<Scalars['Int']>;
    cancelledAt?: Maybe<Scalars['DateTime']>;
    cancelledReason?: Maybe<Scalars['String']>;
    completedAt?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutRequestsInput;
    inProgressAt?: Maybe<Scalars['DateTime']>;
    jobTitle?: Maybe<Scalars['String']>;
    logs?: Maybe<RequestLogCreateNestedManyWithoutRequestInput>;
    message?: Maybe<Scalars['String']>;
    notes?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutRequestsInput>;
    owner?: Maybe<UserCreateNestedOneWithoutRequestsInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutRequestInput>;
    slackTs?: Maybe<Scalars['String']>;
    status?: Maybe<RequestStatus>;
    submittedAt?: Maybe<Scalars['DateTime']>;
    submittedBy?: Maybe<UserCreateNestedOneWithoutSubmittedRequestsInput>;
    template?: Maybe<TemplateFlavor>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
    users?: Maybe<UserCreateNestedManyWithoutFreeRequestInput>;
};
export declare type RequestListRelationFilter = {
    every?: Maybe<RequestWhereInput>;
    none?: Maybe<RequestWhereInput>;
    some?: Maybe<RequestWhereInput>;
};
/** Request Logs */
export declare type RequestLog = {
    createdAt: Scalars['DateTime'];
    event: RequestLogsEvent;
    id: Scalars['Int'];
    request: Request;
    updatedAt: Scalars['DateTime'];
    user: User;
    userId: Scalars['Int'];
};
export declare type RequestLogCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    event: RequestLogsEvent;
    request: RequestCreateNestedOneWithoutLogsInput;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user: UserCreateNestedOneWithoutRequestLogsInput;
};
export declare type RequestLogCreateNestedManyWithoutRequestInput = {
    connect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestLogCreateOrConnectWithoutRequestInput>>;
    create?: Maybe<Array<RequestLogCreateWithoutRequestInput>>;
};
export declare type RequestLogCreateNestedManyWithoutUserInput = {
    connect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestLogCreateOrConnectWithoutUserInput>>;
    create?: Maybe<Array<RequestLogCreateWithoutUserInput>>;
};
export declare type RequestLogCreateOrConnectWithoutRequestInput = {
    create: RequestLogCreateWithoutRequestInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogCreateOrConnectWithoutUserInput = {
    create: RequestLogCreateWithoutUserInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogCreateWithoutRequestInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    event: RequestLogsEvent;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user: UserCreateNestedOneWithoutRequestLogsInput;
};
export declare type RequestLogCreateWithoutUserInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    event: RequestLogsEvent;
    request: RequestCreateNestedOneWithoutLogsInput;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type RequestLogListRelationFilter = {
    every?: Maybe<RequestLogWhereInput>;
    none?: Maybe<RequestLogWhereInput>;
    some?: Maybe<RequestLogWhereInput>;
};
export declare type RequestLogOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    event?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    request?: Maybe<RequestOrderByInput>;
    requestId?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    user?: Maybe<UserOrderByInput>;
    userId?: Maybe<SortOrder>;
};
export declare type RequestLogScalarWhereInput = {
    AND?: Maybe<Array<RequestLogScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    event?: Maybe<EnumRequestLogsEventFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<RequestLogScalarWhereInput>>;
    OR?: Maybe<Array<RequestLogScalarWhereInput>>;
    requestId?: Maybe<IntFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    userId?: Maybe<IntFilter>;
};
export declare type RequestLogUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    event?: Maybe<EnumRequestLogsEventFieldUpdateOperationsInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutLogsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    user?: Maybe<UserUpdateOneRequiredWithoutRequestLogsInput>;
};
export declare type RequestLogUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    event?: Maybe<EnumRequestLogsEventFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type RequestLogUpdateManyWithWhereWithoutRequestInput = {
    data: RequestLogUpdateManyMutationInput;
    where: RequestLogScalarWhereInput;
};
export declare type RequestLogUpdateManyWithWhereWithoutUserInput = {
    data: RequestLogUpdateManyMutationInput;
    where: RequestLogScalarWhereInput;
};
export declare type RequestLogUpdateManyWithoutRequestInput = {
    connect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestLogCreateOrConnectWithoutRequestInput>>;
    create?: Maybe<Array<RequestLogCreateWithoutRequestInput>>;
    delete?: Maybe<Array<RequestLogWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestLogScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    set?: Maybe<Array<RequestLogWhereUniqueInput>>;
    update?: Maybe<Array<RequestLogUpdateWithWhereUniqueWithoutRequestInput>>;
    updateMany?: Maybe<Array<RequestLogUpdateManyWithWhereWithoutRequestInput>>;
    upsert?: Maybe<Array<RequestLogUpsertWithWhereUniqueWithoutRequestInput>>;
};
export declare type RequestLogUpdateManyWithoutUserInput = {
    connect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestLogCreateOrConnectWithoutUserInput>>;
    create?: Maybe<Array<RequestLogCreateWithoutUserInput>>;
    delete?: Maybe<Array<RequestLogWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestLogScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestLogWhereUniqueInput>>;
    set?: Maybe<Array<RequestLogWhereUniqueInput>>;
    update?: Maybe<Array<RequestLogUpdateWithWhereUniqueWithoutUserInput>>;
    updateMany?: Maybe<Array<RequestLogUpdateManyWithWhereWithoutUserInput>>;
    upsert?: Maybe<Array<RequestLogUpsertWithWhereUniqueWithoutUserInput>>;
};
export declare type RequestLogUpdateWithWhereUniqueWithoutRequestInput = {
    data: RequestLogUpdateWithoutRequestInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogUpdateWithWhereUniqueWithoutUserInput = {
    data: RequestLogUpdateWithoutUserInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogUpdateWithoutRequestInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    event?: Maybe<EnumRequestLogsEventFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    user?: Maybe<UserUpdateOneRequiredWithoutRequestLogsInput>;
};
export declare type RequestLogUpdateWithoutUserInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    event?: Maybe<EnumRequestLogsEventFieldUpdateOperationsInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutLogsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type RequestLogUpsertWithWhereUniqueWithoutRequestInput = {
    create: RequestLogCreateWithoutRequestInput;
    update: RequestLogUpdateWithoutRequestInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogUpsertWithWhereUniqueWithoutUserInput = {
    create: RequestLogCreateWithoutUserInput;
    update: RequestLogUpdateWithoutUserInput;
    where: RequestLogWhereUniqueInput;
};
export declare type RequestLogWhereInput = {
    AND?: Maybe<Array<RequestLogWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    event?: Maybe<EnumRequestLogsEventFilter>;
    id?: Maybe<IntFilter>;
    NOT?: Maybe<Array<RequestLogWhereInput>>;
    OR?: Maybe<Array<RequestLogWhereInput>>;
    request?: Maybe<RequestWhereInput>;
    requestId?: Maybe<IntFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    user?: Maybe<UserWhereInput>;
    userId?: Maybe<IntFilter>;
};
export declare type RequestLogWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
export declare enum RequestLogsEvent {
    AllEditsDeleted = "AllEditsDeleted",
    CustomerRequestEdits = "CustomerRequestEdits",
    RenderCompleted = "RenderCompleted",
    RenderFailed = "RenderFailed",
    RequestAccepted = "RequestAccepted",
    RequestReturnedToQueue = "RequestReturnedToQueue",
    RequestSubmitted = "RequestSubmitted",
    ScriptAddedToRenderQueue = "ScriptAddedToRenderQueue",
    VideoPublished = "VideoPublished"
}
export declare type RequestOrderByInput = {
    basePrice?: Maybe<SortOrder>;
    bonusDeadline?: Maybe<SortOrder>;
    bonusPrice?: Maybe<SortOrder>;
    cancelledAt?: Maybe<SortOrder>;
    cancelledReason?: Maybe<SortOrder>;
    completedAt?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerTenant?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    inProgressAt?: Maybe<SortOrder>;
    jobTitle?: Maybe<SortOrder>;
    message?: Maybe<SortOrder>;
    notes?: Maybe<SortOrder>;
    order?: Maybe<OrderOrderByInput>;
    orderId?: Maybe<SortOrder>;
    owner?: Maybe<UserOrderByInput>;
    ownerId?: Maybe<SortOrder>;
    script?: Maybe<ScriptOrderByInput>;
    slackTs?: Maybe<SortOrder>;
    status?: Maybe<SortOrder>;
    submittedAt?: Maybe<SortOrder>;
    submittedBy?: Maybe<UserOrderByInput>;
    submittedById?: Maybe<SortOrder>;
    template?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    url?: Maybe<SortOrder>;
};
export declare type RequestScalarWhereInput = {
    AND?: Maybe<Array<RequestScalarWhereInput>>;
    basePrice?: Maybe<IntNullableFilter>;
    bonusDeadline?: Maybe<DateTimeNullableFilter>;
    bonusPrice?: Maybe<IntNullableFilter>;
    cancelledAt?: Maybe<DateTimeNullableFilter>;
    cancelledReason?: Maybe<StringNullableFilter>;
    completedAt?: Maybe<DateTimeNullableFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    customerTenant?: Maybe<StringFilter>;
    id?: Maybe<IntFilter>;
    inProgressAt?: Maybe<DateTimeNullableFilter>;
    jobTitle?: Maybe<StringNullableFilter>;
    message?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<RequestScalarWhereInput>>;
    notes?: Maybe<StringNullableFilter>;
    OR?: Maybe<Array<RequestScalarWhereInput>>;
    orderId?: Maybe<IntNullableFilter>;
    ownerId?: Maybe<IntNullableFilter>;
    slackTs?: Maybe<StringNullableFilter>;
    status?: Maybe<EnumRequestStatusFilter>;
    submittedAt?: Maybe<DateTimeNullableFilter>;
    submittedById?: Maybe<IntNullableFilter>;
    template?: Maybe<EnumTemplateFlavorNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    url?: Maybe<StringNullableFilter>;
};
export declare enum RequestStatus {
    Cancelled = "cancelled",
    Completed = "completed",
    Draft = "draft",
    Final = "final",
    Qa = "qa",
    Queued = "queued",
    Rendering = "rendering",
    Scripting = "scripting",
    Submitted = "submitted"
}
export declare type RequestUpdateInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateManyMutationInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type RequestUpdateManyWithWhereWithoutCustomerInput = {
    data: RequestUpdateManyMutationInput;
    where: RequestScalarWhereInput;
};
export declare type RequestUpdateManyWithWhereWithoutOrderInput = {
    data: RequestUpdateManyMutationInput;
    where: RequestScalarWhereInput;
};
export declare type RequestUpdateManyWithWhereWithoutOwnerInput = {
    data: RequestUpdateManyMutationInput;
    where: RequestScalarWhereInput;
};
export declare type RequestUpdateManyWithWhereWithoutSubmittedByInput = {
    data: RequestUpdateManyMutationInput;
    where: RequestScalarWhereInput;
};
export declare type RequestUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<RequestCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<RequestWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestWhereUniqueInput>>;
    set?: Maybe<Array<RequestWhereUniqueInput>>;
    update?: Maybe<Array<RequestUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<RequestUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<RequestUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type RequestUpdateManyWithoutOrderInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<RequestCreateWithoutOrderInput>>;
    delete?: Maybe<Array<RequestWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestWhereUniqueInput>>;
    set?: Maybe<Array<RequestWhereUniqueInput>>;
    update?: Maybe<Array<RequestUpdateWithWhereUniqueWithoutOrderInput>>;
    updateMany?: Maybe<Array<RequestUpdateManyWithWhereWithoutOrderInput>>;
    upsert?: Maybe<Array<RequestUpsertWithWhereUniqueWithoutOrderInput>>;
};
export declare type RequestUpdateManyWithoutOwnerInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutOwnerInput>>;
    create?: Maybe<Array<RequestCreateWithoutOwnerInput>>;
    delete?: Maybe<Array<RequestWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestWhereUniqueInput>>;
    set?: Maybe<Array<RequestWhereUniqueInput>>;
    update?: Maybe<Array<RequestUpdateWithWhereUniqueWithoutOwnerInput>>;
    updateMany?: Maybe<Array<RequestUpdateManyWithWhereWithoutOwnerInput>>;
    upsert?: Maybe<Array<RequestUpsertWithWhereUniqueWithoutOwnerInput>>;
};
export declare type RequestUpdateManyWithoutSubmittedByInput = {
    connect?: Maybe<Array<RequestWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<RequestCreateOrConnectWithoutSubmittedByInput>>;
    create?: Maybe<Array<RequestCreateWithoutSubmittedByInput>>;
    delete?: Maybe<Array<RequestWhereUniqueInput>>;
    deleteMany?: Maybe<Array<RequestScalarWhereInput>>;
    disconnect?: Maybe<Array<RequestWhereUniqueInput>>;
    set?: Maybe<Array<RequestWhereUniqueInput>>;
    update?: Maybe<Array<RequestUpdateWithWhereUniqueWithoutSubmittedByInput>>;
    updateMany?: Maybe<Array<RequestUpdateManyWithWhereWithoutSubmittedByInput>>;
    upsert?: Maybe<Array<RequestUpsertWithWhereUniqueWithoutSubmittedByInput>>;
};
export declare type RequestUpdateOneRequiredWithoutLogsInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutLogsInput>;
    create?: Maybe<RequestCreateWithoutLogsInput>;
    update?: Maybe<RequestUpdateWithoutLogsInput>;
    upsert?: Maybe<RequestUpsertWithoutLogsInput>;
};
export declare type RequestUpdateOneRequiredWithoutScriptInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutScriptInput>;
    create?: Maybe<RequestCreateWithoutScriptInput>;
    update?: Maybe<RequestUpdateWithoutScriptInput>;
    upsert?: Maybe<RequestUpsertWithoutScriptInput>;
};
export declare type RequestUpdateOneWithoutUsersInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutUsersInput>;
    create?: Maybe<RequestCreateWithoutUsersInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<RequestUpdateWithoutUsersInput>;
    upsert?: Maybe<RequestUpsertWithoutUsersInput>;
};
export declare type RequestUpdateOneWithoutVideoInput = {
    connect?: Maybe<RequestWhereUniqueInput>;
    connectOrCreate?: Maybe<RequestCreateOrConnectWithoutVideoInput>;
    create?: Maybe<RequestCreateWithoutVideoInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<RequestUpdateWithoutVideoInput>;
    upsert?: Maybe<RequestUpsertWithoutVideoInput>;
};
export declare type RequestUpdateWithWhereUniqueWithoutCustomerInput = {
    data: RequestUpdateWithoutCustomerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpdateWithWhereUniqueWithoutOrderInput = {
    data: RequestUpdateWithoutOrderInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpdateWithWhereUniqueWithoutOwnerInput = {
    data: RequestUpdateWithoutOwnerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpdateWithWhereUniqueWithoutSubmittedByInput = {
    data: RequestUpdateWithoutSubmittedByInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpdateWithoutCustomerInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutLogsInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutOrderInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutOwnerInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutScriptInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutSubmittedByInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutUsersInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutRequestInput>;
};
export declare type RequestUpdateWithoutVideoInput = {
    basePrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    bonusDeadline?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    bonusPrice?: Maybe<NullableIntFieldUpdateOperationsInput>;
    cancelledAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    cancelledReason?: Maybe<NullableStringFieldUpdateOperationsInput>;
    completedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutRequestsInput>;
    inProgressAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    jobTitle?: Maybe<NullableStringFieldUpdateOperationsInput>;
    logs?: Maybe<RequestLogUpdateManyWithoutRequestInput>;
    message?: Maybe<NullableStringFieldUpdateOperationsInput>;
    notes?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutRequestsInput>;
    owner?: Maybe<UserUpdateOneWithoutRequestsInput>;
    script?: Maybe<ScriptUpdateOneWithoutRequestInput>;
    slackTs?: Maybe<NullableStringFieldUpdateOperationsInput>;
    status?: Maybe<EnumRequestStatusFieldUpdateOperationsInput>;
    submittedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    submittedBy?: Maybe<UserUpdateOneWithoutSubmittedRequestsInput>;
    template?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    url?: Maybe<NullableStringFieldUpdateOperationsInput>;
    users?: Maybe<UserUpdateManyWithoutFreeRequestInput>;
};
export declare type RequestUpsertWithWhereUniqueWithoutCustomerInput = {
    create: RequestCreateWithoutCustomerInput;
    update: RequestUpdateWithoutCustomerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpsertWithWhereUniqueWithoutOrderInput = {
    create: RequestCreateWithoutOrderInput;
    update: RequestUpdateWithoutOrderInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpsertWithWhereUniqueWithoutOwnerInput = {
    create: RequestCreateWithoutOwnerInput;
    update: RequestUpdateWithoutOwnerInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpsertWithWhereUniqueWithoutSubmittedByInput = {
    create: RequestCreateWithoutSubmittedByInput;
    update: RequestUpdateWithoutSubmittedByInput;
    where: RequestWhereUniqueInput;
};
export declare type RequestUpsertWithoutLogsInput = {
    create: RequestCreateWithoutLogsInput;
    update: RequestUpdateWithoutLogsInput;
};
export declare type RequestUpsertWithoutScriptInput = {
    create: RequestCreateWithoutScriptInput;
    update: RequestUpdateWithoutScriptInput;
};
export declare type RequestUpsertWithoutUsersInput = {
    create: RequestCreateWithoutUsersInput;
    update: RequestUpdateWithoutUsersInput;
};
export declare type RequestUpsertWithoutVideoInput = {
    create: RequestCreateWithoutVideoInput;
    update: RequestUpdateWithoutVideoInput;
};
export declare type RequestWhereInput = {
    AND?: Maybe<Array<RequestWhereInput>>;
    basePrice?: Maybe<IntNullableFilter>;
    bonusDeadline?: Maybe<DateTimeNullableFilter>;
    bonusPrice?: Maybe<IntNullableFilter>;
    cancelledAt?: Maybe<DateTimeNullableFilter>;
    cancelledReason?: Maybe<StringNullableFilter>;
    completedAt?: Maybe<DateTimeNullableFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerTenant?: Maybe<StringFilter>;
    id?: Maybe<IntFilter>;
    inProgressAt?: Maybe<DateTimeNullableFilter>;
    jobTitle?: Maybe<StringNullableFilter>;
    logs?: Maybe<RequestLogListRelationFilter>;
    message?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<RequestWhereInput>>;
    notes?: Maybe<StringNullableFilter>;
    OR?: Maybe<Array<RequestWhereInput>>;
    order?: Maybe<OrderWhereInput>;
    orderId?: Maybe<IntNullableFilter>;
    owner?: Maybe<UserWhereInput>;
    ownerId?: Maybe<IntNullableFilter>;
    script?: Maybe<ScriptWhereInput>;
    slackTs?: Maybe<StringNullableFilter>;
    status?: Maybe<EnumRequestStatusFilter>;
    submittedAt?: Maybe<DateTimeNullableFilter>;
    submittedBy?: Maybe<UserWhereInput>;
    submittedById?: Maybe<IntNullableFilter>;
    template?: Maybe<EnumTemplateFlavorNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    url?: Maybe<StringNullableFilter>;
    users?: Maybe<UserListRelationFilter>;
    video?: Maybe<VideoWhereInput>;
};
export declare type RequestWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
export declare type Script = {
    createdAt: Scalars['DateTime'];
    customer?: Maybe<Customer>;
    customerTenant?: Maybe<Scalars['String']>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    id: Scalars['Int'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<Order>;
    producer?: Maybe<User>;
    renders: Array<Render>;
    request: Request;
    slides: Scalars['Json'];
    updatedAt: Scalars['DateTime'];
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<Video>;
};
export declare type ScriptRendersArgs = {
    cursor?: Maybe<RenderWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type ScriptCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<ScriptCreateWithoutCustomerInput>>;
};
export declare type ScriptCreateNestedManyWithoutOrderInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<ScriptCreateWithoutOrderInput>>;
};
export declare type ScriptCreateNestedManyWithoutProducerInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutProducerInput>>;
    create?: Maybe<Array<ScriptCreateWithoutProducerInput>>;
};
export declare type ScriptCreateNestedManyWithoutTemplateInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutTemplateInput>>;
    create?: Maybe<Array<ScriptCreateWithoutTemplateInput>>;
};
export declare type ScriptCreateNestedOneWithoutRendersInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutRendersInput>;
    create?: Maybe<ScriptCreateWithoutRendersInput>;
};
export declare type ScriptCreateNestedOneWithoutRequestInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutRequestInput>;
    create?: Maybe<ScriptCreateWithoutRequestInput>;
};
export declare type ScriptCreateNestedOneWithoutVideoInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutVideoInput>;
    create?: Maybe<ScriptCreateWithoutVideoInput>;
};
export declare type ScriptCreateOrConnectWithoutCustomerInput = {
    create: ScriptCreateWithoutCustomerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutOrderInput = {
    create: ScriptCreateWithoutOrderInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutProducerInput = {
    create: ScriptCreateWithoutProducerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutRendersInput = {
    create: ScriptCreateWithoutRendersInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutRequestInput = {
    create: ScriptCreateWithoutRequestInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutTemplateInput = {
    create: ScriptCreateWithoutTemplateInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateOrConnectWithoutVideoInput = {
    create: ScriptCreateWithoutVideoInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutOrderInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutProducerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutRendersInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutRequestInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutTemplateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
    video?: Maybe<VideoCreateNestedOneWithoutScriptInput>;
};
export declare type ScriptCreateWithoutVideoInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutScriptsInput>;
    customerUpdate?: Maybe<Scalars['Boolean']>;
    flavor: TemplateFlavor;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutScriptsInput>;
    producer?: Maybe<UserCreateNestedOneWithoutScriptsInput>;
    renders?: Maybe<RenderCreateNestedManyWithoutScriptInput>;
    request: RequestCreateNestedOneWithoutScriptInput;
    slides: Scalars['Json'];
    template?: Maybe<TemplateCreateNestedOneWithoutScriptsInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    variables?: Maybe<Scalars['String']>;
};
export declare type ScriptListRelationFilter = {
    every?: Maybe<ScriptWhereInput>;
    none?: Maybe<ScriptWhereInput>;
    some?: Maybe<ScriptWhereInput>;
};
export declare type ScriptOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerTenant?: Maybe<SortOrder>;
    customerUpdate?: Maybe<SortOrder>;
    flavor?: Maybe<SortOrder>;
    globals?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    layers?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    order?: Maybe<OrderOrderByInput>;
    orderId?: Maybe<SortOrder>;
    producer?: Maybe<UserOrderByInput>;
    requestId?: Maybe<SortOrder>;
    slides?: Maybe<SortOrder>;
    template?: Maybe<TemplateOrderByInput>;
    templateId?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    userId?: Maybe<SortOrder>;
    variables?: Maybe<SortOrder>;
    video?: Maybe<VideoOrderByInput>;
    videoId?: Maybe<SortOrder>;
};
export declare type ScriptScalarWhereInput = {
    AND?: Maybe<Array<ScriptScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerTenant?: Maybe<StringNullableFilter>;
    customerUpdate?: Maybe<BoolNullableFilter>;
    flavor?: Maybe<EnumTemplateFlavorFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<ScriptScalarWhereInput>>;
    OR?: Maybe<Array<ScriptScalarWhereInput>>;
    orderId?: Maybe<IntNullableFilter>;
    requestId?: Maybe<IntFilter>;
    templateId?: Maybe<IntNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    userId?: Maybe<IntNullableFilter>;
    variables?: Maybe<StringNullableFilter>;
    videoId?: Maybe<IntNullableFilter>;
};
export declare type ScriptUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    slides?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type ScriptUpdateManyWithWhereWithoutCustomerInput = {
    data: ScriptUpdateManyMutationInput;
    where: ScriptScalarWhereInput;
};
export declare type ScriptUpdateManyWithWhereWithoutOrderInput = {
    data: ScriptUpdateManyMutationInput;
    where: ScriptScalarWhereInput;
};
export declare type ScriptUpdateManyWithWhereWithoutProducerInput = {
    data: ScriptUpdateManyMutationInput;
    where: ScriptScalarWhereInput;
};
export declare type ScriptUpdateManyWithWhereWithoutTemplateInput = {
    data: ScriptUpdateManyMutationInput;
    where: ScriptScalarWhereInput;
};
export declare type ScriptUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<ScriptCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<ScriptWhereUniqueInput>>;
    deleteMany?: Maybe<Array<ScriptScalarWhereInput>>;
    disconnect?: Maybe<Array<ScriptWhereUniqueInput>>;
    set?: Maybe<Array<ScriptWhereUniqueInput>>;
    update?: Maybe<Array<ScriptUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<ScriptUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<ScriptUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type ScriptUpdateManyWithoutOrderInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<ScriptCreateWithoutOrderInput>>;
    delete?: Maybe<Array<ScriptWhereUniqueInput>>;
    deleteMany?: Maybe<Array<ScriptScalarWhereInput>>;
    disconnect?: Maybe<Array<ScriptWhereUniqueInput>>;
    set?: Maybe<Array<ScriptWhereUniqueInput>>;
    update?: Maybe<Array<ScriptUpdateWithWhereUniqueWithoutOrderInput>>;
    updateMany?: Maybe<Array<ScriptUpdateManyWithWhereWithoutOrderInput>>;
    upsert?: Maybe<Array<ScriptUpsertWithWhereUniqueWithoutOrderInput>>;
};
export declare type ScriptUpdateManyWithoutProducerInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutProducerInput>>;
    create?: Maybe<Array<ScriptCreateWithoutProducerInput>>;
    delete?: Maybe<Array<ScriptWhereUniqueInput>>;
    deleteMany?: Maybe<Array<ScriptScalarWhereInput>>;
    disconnect?: Maybe<Array<ScriptWhereUniqueInput>>;
    set?: Maybe<Array<ScriptWhereUniqueInput>>;
    update?: Maybe<Array<ScriptUpdateWithWhereUniqueWithoutProducerInput>>;
    updateMany?: Maybe<Array<ScriptUpdateManyWithWhereWithoutProducerInput>>;
    upsert?: Maybe<Array<ScriptUpsertWithWhereUniqueWithoutProducerInput>>;
};
export declare type ScriptUpdateManyWithoutTemplateInput = {
    connect?: Maybe<Array<ScriptWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<ScriptCreateOrConnectWithoutTemplateInput>>;
    create?: Maybe<Array<ScriptCreateWithoutTemplateInput>>;
    delete?: Maybe<Array<ScriptWhereUniqueInput>>;
    deleteMany?: Maybe<Array<ScriptScalarWhereInput>>;
    disconnect?: Maybe<Array<ScriptWhereUniqueInput>>;
    set?: Maybe<Array<ScriptWhereUniqueInput>>;
    update?: Maybe<Array<ScriptUpdateWithWhereUniqueWithoutTemplateInput>>;
    updateMany?: Maybe<Array<ScriptUpdateManyWithWhereWithoutTemplateInput>>;
    upsert?: Maybe<Array<ScriptUpsertWithWhereUniqueWithoutTemplateInput>>;
};
export declare type ScriptUpdateOneRequiredWithoutRendersInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutRendersInput>;
    create?: Maybe<ScriptCreateWithoutRendersInput>;
    update?: Maybe<ScriptUpdateWithoutRendersInput>;
    upsert?: Maybe<ScriptUpsertWithoutRendersInput>;
};
export declare type ScriptUpdateOneWithoutRequestInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutRequestInput>;
    create?: Maybe<ScriptCreateWithoutRequestInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<ScriptUpdateWithoutRequestInput>;
    upsert?: Maybe<ScriptUpsertWithoutRequestInput>;
};
export declare type ScriptUpdateOneWithoutVideoInput = {
    connect?: Maybe<ScriptWhereUniqueInput>;
    connectOrCreate?: Maybe<ScriptCreateOrConnectWithoutVideoInput>;
    create?: Maybe<ScriptCreateWithoutVideoInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<ScriptUpdateWithoutVideoInput>;
    upsert?: Maybe<ScriptUpsertWithoutVideoInput>;
};
export declare type ScriptUpdateWithWhereUniqueWithoutCustomerInput = {
    data: ScriptUpdateWithoutCustomerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpdateWithWhereUniqueWithoutOrderInput = {
    data: ScriptUpdateWithoutOrderInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpdateWithWhereUniqueWithoutProducerInput = {
    data: ScriptUpdateWithoutProducerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpdateWithWhereUniqueWithoutTemplateInput = {
    data: ScriptUpdateWithoutTemplateInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutOrderInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutProducerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutRendersInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutRequestInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutTemplateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
    video?: Maybe<VideoUpdateOneWithoutScriptInput>;
};
export declare type ScriptUpdateWithoutVideoInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutScriptsInput>;
    customerUpdate?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    flavor?: Maybe<EnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutScriptsInput>;
    producer?: Maybe<UserUpdateOneWithoutScriptsInput>;
    renders?: Maybe<RenderUpdateManyWithoutScriptInput>;
    request?: Maybe<RequestUpdateOneRequiredWithoutScriptInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<TemplateUpdateOneWithoutScriptsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    variables?: Maybe<NullableStringFieldUpdateOperationsInput>;
};
export declare type ScriptUpsertWithWhereUniqueWithoutCustomerInput = {
    create: ScriptCreateWithoutCustomerInput;
    update: ScriptUpdateWithoutCustomerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpsertWithWhereUniqueWithoutOrderInput = {
    create: ScriptCreateWithoutOrderInput;
    update: ScriptUpdateWithoutOrderInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpsertWithWhereUniqueWithoutProducerInput = {
    create: ScriptCreateWithoutProducerInput;
    update: ScriptUpdateWithoutProducerInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpsertWithWhereUniqueWithoutTemplateInput = {
    create: ScriptCreateWithoutTemplateInput;
    update: ScriptUpdateWithoutTemplateInput;
    where: ScriptWhereUniqueInput;
};
export declare type ScriptUpsertWithoutRendersInput = {
    create: ScriptCreateWithoutRendersInput;
    update: ScriptUpdateWithoutRendersInput;
};
export declare type ScriptUpsertWithoutRequestInput = {
    create: ScriptCreateWithoutRequestInput;
    update: ScriptUpdateWithoutRequestInput;
};
export declare type ScriptUpsertWithoutVideoInput = {
    create: ScriptCreateWithoutVideoInput;
    update: ScriptUpdateWithoutVideoInput;
};
export declare type ScriptWhereInput = {
    AND?: Maybe<Array<ScriptWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerTenant?: Maybe<StringNullableFilter>;
    customerUpdate?: Maybe<BoolNullableFilter>;
    flavor?: Maybe<EnumTemplateFlavorFilter>;
    id?: Maybe<IntFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<ScriptWhereInput>>;
    OR?: Maybe<Array<ScriptWhereInput>>;
    order?: Maybe<OrderWhereInput>;
    orderId?: Maybe<IntNullableFilter>;
    producer?: Maybe<UserWhereInput>;
    renders?: Maybe<RenderListRelationFilter>;
    request?: Maybe<RequestWhereInput>;
    requestId?: Maybe<IntFilter>;
    template?: Maybe<TemplateWhereInput>;
    templateId?: Maybe<IntNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    userId?: Maybe<IntNullableFilter>;
    variables?: Maybe<StringNullableFilter>;
    video?: Maybe<VideoWhereInput>;
    videoId?: Maybe<IntNullableFilter>;
};
export declare type ScriptWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    videoId?: Maybe<Scalars['Int']>;
};
export declare enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}
export declare type StringFieldUpdateOperationsInput = {
    set?: Maybe<Scalars['String']>;
};
export declare type StringFilter = {
    contains?: Maybe<Scalars['String']>;
    endsWith?: Maybe<Scalars['String']>;
    equals?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    gte?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    lt?: Maybe<Scalars['String']>;
    lte?: Maybe<Scalars['String']>;
    mode?: Maybe<QueryMode>;
    not?: Maybe<NestedStringFilter>;
    notIn?: Maybe<Array<Scalars['String']>>;
    startsWith?: Maybe<Scalars['String']>;
};
export declare type StringNullableFilter = {
    contains?: Maybe<Scalars['String']>;
    endsWith?: Maybe<Scalars['String']>;
    equals?: Maybe<Scalars['String']>;
    gt?: Maybe<Scalars['String']>;
    gte?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Scalars['String']>>;
    lt?: Maybe<Scalars['String']>;
    lte?: Maybe<Scalars['String']>;
    mode?: Maybe<QueryMode>;
    not?: Maybe<NestedStringNullableFilter>;
    notIn?: Maybe<Array<Scalars['String']>>;
    startsWith?: Maybe<Scalars['String']>;
};
export declare type Sub = {
    createdAt: Scalars['DateTime'];
    customer?: Maybe<Customer>;
    id: Scalars['Int'];
    liveVideoCap?: Maybe<Scalars['Int']>;
    tier?: Maybe<Scalars['String']>;
    updatedAt: Scalars['DateTime'];
    yearlyVideoCap?: Maybe<Scalars['Int']>;
};
export declare type SubCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutSubscriptionInput>;
    liveVideoCap?: Maybe<Scalars['Int']>;
    tier?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    yearlyVideoCap?: Maybe<Scalars['Int']>;
};
export declare type SubCreateNestedOneWithoutCustomerInput = {
    connect?: Maybe<SubWhereUniqueInput>;
    connectOrCreate?: Maybe<SubCreateOrConnectWithoutCustomerInput>;
    create?: Maybe<SubCreateWithoutCustomerInput>;
};
export declare type SubCreateOrConnectWithoutCustomerInput = {
    create: SubCreateWithoutCustomerInput;
    where: SubWhereUniqueInput;
};
export declare type SubCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    liveVideoCap?: Maybe<Scalars['Int']>;
    tier?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    yearlyVideoCap?: Maybe<Scalars['Int']>;
};
export declare type SubOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    liveVideoCap?: Maybe<SortOrder>;
    tier?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    yearlyVideoCap?: Maybe<SortOrder>;
};
export declare type SubUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutSubscriptionInput>;
    liveVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
    tier?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    yearlyVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type SubUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    liveVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
    tier?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    yearlyVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type SubUpdateOneWithoutCustomerInput = {
    connect?: Maybe<SubWhereUniqueInput>;
    connectOrCreate?: Maybe<SubCreateOrConnectWithoutCustomerInput>;
    create?: Maybe<SubCreateWithoutCustomerInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<SubUpdateWithoutCustomerInput>;
    upsert?: Maybe<SubUpsertWithoutCustomerInput>;
};
export declare type SubUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    liveVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
    tier?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    yearlyVideoCap?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type SubUpsertWithoutCustomerInput = {
    create: SubCreateWithoutCustomerInput;
    update: SubUpdateWithoutCustomerInput;
};
export declare type SubWhereInput = {
    AND?: Maybe<Array<SubWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    id?: Maybe<IntFilter>;
    liveVideoCap?: Maybe<IntNullableFilter>;
    NOT?: Maybe<Array<SubWhereInput>>;
    OR?: Maybe<Array<SubWhereInput>>;
    tier?: Maybe<StringNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    yearlyVideoCap?: Maybe<IntNullableFilter>;
};
export declare type SubWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
};
export declare type Success = {
    message?: Maybe<Scalars['String']>;
};
export declare type TemplateCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<TemplateWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<TemplateCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<TemplateCreateWithoutCustomerInput>>;
};
export declare type TemplateCreateNestedOneWithoutScriptsInput = {
    connect?: Maybe<TemplateWhereUniqueInput>;
    connectOrCreate?: Maybe<TemplateCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<TemplateCreateWithoutScriptsInput>;
};
export declare type TemplateCreateOrConnectWithoutCustomerInput = {
    create: TemplateCreateWithoutCustomerInput;
    where: TemplateWhereUniqueInput;
};
export declare type TemplateCreateOrConnectWithoutScriptsInput = {
    create: TemplateCreateWithoutScriptsInput;
    where: TemplateWhereUniqueInput;
};
export declare type TemplateCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    example?: Maybe<Scalars['String']>;
    file?: Maybe<Scalars['String']>;
    flavor?: Maybe<TemplateFlavor>;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    maps?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    scripts?: Maybe<ScriptCreateNestedManyWithoutTemplateInput>;
    slides: Scalars['Json'];
    template: Scalars['Json'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type TemplateCreateWithoutScriptsInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer?: Maybe<CustomerCreateNestedOneWithoutTemplatesInput>;
    example?: Maybe<Scalars['String']>;
    file?: Maybe<Scalars['String']>;
    flavor?: Maybe<TemplateFlavor>;
    globals: Scalars['Json'];
    layers: Scalars['Json'];
    maps?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    slides: Scalars['Json'];
    template: Scalars['Json'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare enum TemplateFlavor {
    E1 = "E1",
    T1 = "T1",
    T10 = "T10",
    T11 = "T11",
    T12 = "T12",
    T13 = "T13",
    T14 = "T14",
    T15 = "T15",
    T16 = "T16",
    T2 = "T2",
    T4 = "T4",
    T6 = "T6",
    T7 = "T7",
    T8 = "T8"
}
export declare type TemplateListRelationFilter = {
    every?: Maybe<TemplateWhereInput>;
    none?: Maybe<TemplateWhereInput>;
    some?: Maybe<TemplateWhereInput>;
};
export declare type TemplateOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerId?: Maybe<SortOrder>;
    example?: Maybe<SortOrder>;
    file?: Maybe<SortOrder>;
    flavor?: Maybe<SortOrder>;
    globals?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    layers?: Maybe<SortOrder>;
    maps?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    slides?: Maybe<SortOrder>;
    template?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare type TemplateScalarWhereInput = {
    AND?: Maybe<Array<TemplateScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerId?: Maybe<IntNullableFilter>;
    example?: Maybe<StringNullableFilter>;
    file?: Maybe<StringNullableFilter>;
    flavor?: Maybe<EnumTemplateFlavorNullableFilter>;
    id?: Maybe<IntFilter>;
    maps?: Maybe<StringNullableFilter>;
    name?: Maybe<StringFilter>;
    NOT?: Maybe<Array<TemplateScalarWhereInput>>;
    OR?: Maybe<Array<TemplateScalarWhereInput>>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type TemplateUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    example?: Maybe<NullableStringFieldUpdateOperationsInput>;
    file?: Maybe<NullableStringFieldUpdateOperationsInput>;
    flavor?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    maps?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type TemplateUpdateManyWithWhereWithoutCustomerInput = {
    data: TemplateUpdateManyMutationInput;
    where: TemplateScalarWhereInput;
};
export declare type TemplateUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<TemplateWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<TemplateCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<TemplateCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<TemplateWhereUniqueInput>>;
    deleteMany?: Maybe<Array<TemplateScalarWhereInput>>;
    disconnect?: Maybe<Array<TemplateWhereUniqueInput>>;
    set?: Maybe<Array<TemplateWhereUniqueInput>>;
    update?: Maybe<Array<TemplateUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<TemplateUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<TemplateUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type TemplateUpdateOneWithoutScriptsInput = {
    connect?: Maybe<TemplateWhereUniqueInput>;
    connectOrCreate?: Maybe<TemplateCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<TemplateCreateWithoutScriptsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<TemplateUpdateWithoutScriptsInput>;
    upsert?: Maybe<TemplateUpsertWithoutScriptsInput>;
};
export declare type TemplateUpdateWithWhereUniqueWithoutCustomerInput = {
    data: TemplateUpdateWithoutCustomerInput;
    where: TemplateWhereUniqueInput;
};
export declare type TemplateUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    example?: Maybe<NullableStringFieldUpdateOperationsInput>;
    file?: Maybe<NullableStringFieldUpdateOperationsInput>;
    flavor?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    maps?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutTemplateInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type TemplateUpdateWithoutScriptsInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneWithoutTemplatesInput>;
    example?: Maybe<NullableStringFieldUpdateOperationsInput>;
    file?: Maybe<NullableStringFieldUpdateOperationsInput>;
    flavor?: Maybe<NullableEnumTemplateFlavorFieldUpdateOperationsInput>;
    globals?: Maybe<Scalars['Json']>;
    layers?: Maybe<Scalars['Json']>;
    maps?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<StringFieldUpdateOperationsInput>;
    slides?: Maybe<Scalars['Json']>;
    template?: Maybe<Scalars['Json']>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type TemplateUpsertWithWhereUniqueWithoutCustomerInput = {
    create: TemplateCreateWithoutCustomerInput;
    update: TemplateUpdateWithoutCustomerInput;
    where: TemplateWhereUniqueInput;
};
export declare type TemplateUpsertWithoutScriptsInput = {
    create: TemplateCreateWithoutScriptsInput;
    update: TemplateUpdateWithoutScriptsInput;
};
export declare type TemplateWhereInput = {
    AND?: Maybe<Array<TemplateWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerId?: Maybe<IntNullableFilter>;
    example?: Maybe<StringNullableFilter>;
    file?: Maybe<StringNullableFilter>;
    flavor?: Maybe<EnumTemplateFlavorNullableFilter>;
    id?: Maybe<IntFilter>;
    maps?: Maybe<StringNullableFilter>;
    name?: Maybe<StringFilter>;
    NOT?: Maybe<Array<TemplateWhereInput>>;
    OR?: Maybe<Array<TemplateWhereInput>>;
    scripts?: Maybe<ScriptListRelationFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type TemplateWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
};
export declare type Token = {
    accessToken?: Maybe<Scalars['String']>;
    decodedToken?: Maybe<Scalars['JSON']>;
    expiresAt?: Maybe<Scalars['Int']>;
    expiresIn?: Maybe<Scalars['Int']>;
    idToken?: Maybe<Scalars['String']>;
};
/** A signature used to sign uploads from the Cloudinary upload widget. */
export declare type UploadSignature = {
    uploadSignature?: Maybe<Scalars['String']>;
};
/** Parameters needed for signing uploads to cloudinary. */
export declare type UploadSignatureInput = {
    folder?: Maybe<Scalars['String']>;
    public_id?: Maybe<Scalars['String']>;
    source: Scalars['String'];
    /** comma seperated list of tags.  E.g. "tags=foo,bar,hello world" */
    tags?: Maybe<Scalars['String']>;
    timestamp: Scalars['Int'];
    upload_preset?: Maybe<Scalars['String']>;
};
export declare type User = {
    authId: Scalars['String'];
    avatar: Scalars['String'];
    createdAt: Scalars['DateTime'];
    customers: Array<Customer>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<Request>;
    freeRequestId?: Maybe<Scalars['Int']>;
    hasFreeRequest: Scalars['Boolean'];
    hsContactId?: Maybe<Scalars['BigInt']>;
    id: Scalars['Int'];
    isApproved: Scalars['Boolean'];
    /** Checks if user is active. */
    isUserActive?: Maybe<Scalars['Boolean']>;
    /** Return the last time a user logged in. */
    lastLogin?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory: Array<LoginHistory>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut: Scalars['Boolean'];
    requests: Array<Request>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests: Array<Request>;
    /** Return the auth0 tenants associated with a user. */
    tenants?: Maybe<Scalars['JSON']>;
    updatedAt: Scalars['DateTime'];
};
export declare type UserCustomersArgs = {
    cursor?: Maybe<CustomerWhereUniqueInput>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type UserLoginHistoryArgs = {
    cursor?: Maybe<LoginHistoryWhereUniqueInput>;
    orderBy?: Maybe<Array<LoginHistoryOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type UserRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type UserSubmittedRequestsArgs = {
    cursor?: Maybe<RequestWhereUniqueInput>;
    orderBy?: Maybe<Array<RequestOrderByInput>>;
    skip?: Maybe<Scalars['Int']>;
    take?: Maybe<Scalars['Int']>;
};
export declare type UserCreateInput = {
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateNestedManyWithoutCustomersInput = {
    connect?: Maybe<Array<UserWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutCustomersInput>>;
    create?: Maybe<Array<UserCreateWithoutCustomersInput>>;
};
export declare type UserCreateNestedManyWithoutFreeRequestInput = {
    connect?: Maybe<Array<UserWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutFreeRequestInput>>;
    create?: Maybe<Array<UserCreateWithoutFreeRequestInput>>;
};
export declare type UserCreateNestedOneWithoutLoginHistoryInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutLoginHistoryInput>;
    create?: Maybe<UserCreateWithoutLoginHistoryInput>;
};
export declare type UserCreateNestedOneWithoutRequestLogsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutRequestLogsInput>;
    create?: Maybe<UserCreateWithoutRequestLogsInput>;
};
export declare type UserCreateNestedOneWithoutRequestsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<UserCreateWithoutRequestsInput>;
};
export declare type UserCreateNestedOneWithoutScriptsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<UserCreateWithoutScriptsInput>;
};
export declare type UserCreateNestedOneWithoutSubmittedRequestsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutSubmittedRequestsInput>;
    create?: Maybe<UserCreateWithoutSubmittedRequestsInput>;
};
export declare type UserCreateOrConnectWithoutCustomersInput = {
    create: UserCreateWithoutCustomersInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutFreeRequestInput = {
    create: UserCreateWithoutFreeRequestInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutLoginHistoryInput = {
    create: UserCreateWithoutLoginHistoryInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutRequestLogsInput = {
    create: UserCreateWithoutRequestLogsInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutRequestsInput = {
    create: UserCreateWithoutRequestsInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutScriptsInput = {
    create: UserCreateWithoutScriptsInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateOrConnectWithoutSubmittedRequestsInput = {
    create: UserCreateWithoutSubmittedRequestsInput;
    where: UserWhereUniqueInput;
};
export declare type UserCreateWithoutCustomersInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutFreeRequestInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutLoginHistoryInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutRequestLogsInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutRequestsInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutScriptsInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    slackId?: Maybe<Scalars['String']>;
    submittedRequests?: Maybe<RequestCreateNestedManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserCreateWithoutSubmittedRequestsInput = {
    authId: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    customers?: Maybe<CustomerCreateNestedManyWithoutUsersInput>;
    email: Scalars['String'];
    firstName?: Maybe<Scalars['String']>;
    freeRequest?: Maybe<RequestCreateNestedOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<Scalars['Boolean']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    isApproved?: Maybe<Scalars['Boolean']>;
    lastName?: Maybe<Scalars['String']>;
    loginHistory?: Maybe<LoginHistoryCreateNestedManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<Scalars['Boolean']>;
    requestLogs?: Maybe<RequestLogCreateNestedManyWithoutUserInput>;
    requests?: Maybe<RequestCreateNestedManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptCreateNestedManyWithoutProducerInput>;
    slackId?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserListRelationFilter = {
    every?: Maybe<UserWhereInput>;
    none?: Maybe<UserWhereInput>;
    some?: Maybe<UserWhereInput>;
};
export declare type UserOrderByInput = {
    authId?: Maybe<SortOrder>;
    avatar?: Maybe<SortOrder>;
    createdAt?: Maybe<SortOrder>;
    email?: Maybe<SortOrder>;
    firstName?: Maybe<SortOrder>;
    freeRequest?: Maybe<RequestOrderByInput>;
    freeRequestId?: Maybe<SortOrder>;
    hasFreeRequest?: Maybe<SortOrder>;
    hsContactId?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    isApproved?: Maybe<SortOrder>;
    lastName?: Maybe<SortOrder>;
    onboarding?: Maybe<SortOrder>;
    optOut?: Maybe<SortOrder>;
    slackId?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
};
export declare type UserScalarWhereInput = {
    AND?: Maybe<Array<UserScalarWhereInput>>;
    authId?: Maybe<StringFilter>;
    avatar?: Maybe<StringFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    email?: Maybe<StringFilter>;
    firstName?: Maybe<StringNullableFilter>;
    freeRequestId?: Maybe<IntNullableFilter>;
    hasFreeRequest?: Maybe<BoolFilter>;
    hsContactId?: Maybe<BigIntNullableFilter>;
    id?: Maybe<IntFilter>;
    isApproved?: Maybe<BoolFilter>;
    lastName?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<UserScalarWhereInput>>;
    onboarding?: Maybe<JsonNullableFilter>;
    optOut?: Maybe<BoolFilter>;
    OR?: Maybe<Array<UserScalarWhereInput>>;
    slackId?: Maybe<StringNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type UserSignUpAndToken = {
    accessToken?: Maybe<Scalars['String']>;
    decodedToken?: Maybe<Scalars['JSON']>;
    email?: Maybe<Scalars['String']>;
    expiresAt?: Maybe<Scalars['Int']>;
    expiresIn?: Maybe<Scalars['Int']>;
    firstName?: Maybe<Scalars['String']>;
    idToken?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
};
export declare type UserSignUpWithCustomerAndToken = {
    accessToken?: Maybe<Scalars['String']>;
    decodedToken?: Maybe<Scalars['JSON']>;
    expiresAt?: Maybe<Scalars['Int']>;
    expiresIn?: Maybe<Scalars['Int']>;
    idToken?: Maybe<Scalars['String']>;
    tenant?: Maybe<Scalars['String']>;
};
export declare type UserUpdateInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateManyMutationInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateManyWithWhereWithoutCustomersInput = {
    data: UserUpdateManyMutationInput;
    where: UserScalarWhereInput;
};
export declare type UserUpdateManyWithWhereWithoutFreeRequestInput = {
    data: UserUpdateManyMutationInput;
    where: UserScalarWhereInput;
};
export declare type UserUpdateManyWithoutCustomersInput = {
    connect?: Maybe<Array<UserWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutCustomersInput>>;
    create?: Maybe<Array<UserCreateWithoutCustomersInput>>;
    delete?: Maybe<Array<UserWhereUniqueInput>>;
    deleteMany?: Maybe<Array<UserScalarWhereInput>>;
    disconnect?: Maybe<Array<UserWhereUniqueInput>>;
    set?: Maybe<Array<UserWhereUniqueInput>>;
    update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutCustomersInput>>;
    updateMany?: Maybe<Array<UserUpdateManyWithWhereWithoutCustomersInput>>;
    upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutCustomersInput>>;
};
export declare type UserUpdateManyWithoutFreeRequestInput = {
    connect?: Maybe<Array<UserWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutFreeRequestInput>>;
    create?: Maybe<Array<UserCreateWithoutFreeRequestInput>>;
    delete?: Maybe<Array<UserWhereUniqueInput>>;
    deleteMany?: Maybe<Array<UserScalarWhereInput>>;
    disconnect?: Maybe<Array<UserWhereUniqueInput>>;
    set?: Maybe<Array<UserWhereUniqueInput>>;
    update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutFreeRequestInput>>;
    updateMany?: Maybe<Array<UserUpdateManyWithWhereWithoutFreeRequestInput>>;
    upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutFreeRequestInput>>;
};
export declare type UserUpdateOneRequiredWithoutLoginHistoryInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutLoginHistoryInput>;
    create?: Maybe<UserCreateWithoutLoginHistoryInput>;
    update?: Maybe<UserUpdateWithoutLoginHistoryInput>;
    upsert?: Maybe<UserUpsertWithoutLoginHistoryInput>;
};
export declare type UserUpdateOneRequiredWithoutRequestLogsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutRequestLogsInput>;
    create?: Maybe<UserCreateWithoutRequestLogsInput>;
    update?: Maybe<UserUpdateWithoutRequestLogsInput>;
    upsert?: Maybe<UserUpsertWithoutRequestLogsInput>;
};
export declare type UserUpdateOneWithoutRequestsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutRequestsInput>;
    create?: Maybe<UserCreateWithoutRequestsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<UserUpdateWithoutRequestsInput>;
    upsert?: Maybe<UserUpsertWithoutRequestsInput>;
};
export declare type UserUpdateOneWithoutScriptsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutScriptsInput>;
    create?: Maybe<UserCreateWithoutScriptsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<UserUpdateWithoutScriptsInput>;
    upsert?: Maybe<UserUpsertWithoutScriptsInput>;
};
export declare type UserUpdateOneWithoutSubmittedRequestsInput = {
    connect?: Maybe<UserWhereUniqueInput>;
    connectOrCreate?: Maybe<UserCreateOrConnectWithoutSubmittedRequestsInput>;
    create?: Maybe<UserCreateWithoutSubmittedRequestsInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<UserUpdateWithoutSubmittedRequestsInput>;
    upsert?: Maybe<UserUpsertWithoutSubmittedRequestsInput>;
};
export declare type UserUpdateWithWhereUniqueWithoutCustomersInput = {
    data: UserUpdateWithoutCustomersInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateWithWhereUniqueWithoutFreeRequestInput = {
    data: UserUpdateWithoutFreeRequestInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateWithoutCustomersInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutFreeRequestInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutLoginHistoryInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutRequestLogsInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutRequestsInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutScriptsInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    submittedRequests?: Maybe<RequestUpdateManyWithoutSubmittedByInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpdateWithoutSubmittedRequestsInput = {
    authId?: Maybe<StringFieldUpdateOperationsInput>;
    avatar?: Maybe<StringFieldUpdateOperationsInput>;
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customers?: Maybe<CustomerUpdateManyWithoutUsersInput>;
    email?: Maybe<StringFieldUpdateOperationsInput>;
    firstName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    freeRequest?: Maybe<RequestUpdateOneWithoutUsersInput>;
    hasFreeRequest?: Maybe<BoolFieldUpdateOperationsInput>;
    hsContactId?: Maybe<NullableBigIntFieldUpdateOperationsInput>;
    isApproved?: Maybe<BoolFieldUpdateOperationsInput>;
    lastName?: Maybe<NullableStringFieldUpdateOperationsInput>;
    loginHistory?: Maybe<LoginHistoryUpdateManyWithoutUserInput>;
    onboarding?: Maybe<Scalars['Json']>;
    optOut?: Maybe<BoolFieldUpdateOperationsInput>;
    requestLogs?: Maybe<RequestLogUpdateManyWithoutUserInput>;
    requests?: Maybe<RequestUpdateManyWithoutOwnerInput>;
    scripts?: Maybe<ScriptUpdateManyWithoutProducerInput>;
    slackId?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};
export declare type UserUpsertWithWhereUniqueWithoutCustomersInput = {
    create: UserCreateWithoutCustomersInput;
    update: UserUpdateWithoutCustomersInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpsertWithWhereUniqueWithoutFreeRequestInput = {
    create: UserCreateWithoutFreeRequestInput;
    update: UserUpdateWithoutFreeRequestInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpsertWithoutLoginHistoryInput = {
    create: UserCreateWithoutLoginHistoryInput;
    update: UserUpdateWithoutLoginHistoryInput;
};
export declare type UserUpsertWithoutRequestLogsInput = {
    create: UserCreateWithoutRequestLogsInput;
    update: UserUpdateWithoutRequestLogsInput;
};
export declare type UserUpsertWithoutRequestsInput = {
    create: UserCreateWithoutRequestsInput;
    update: UserUpdateWithoutRequestsInput;
};
export declare type UserUpsertWithoutScriptsInput = {
    create: UserCreateWithoutScriptsInput;
    update: UserUpdateWithoutScriptsInput;
};
export declare type UserUpsertWithoutSubmittedRequestsInput = {
    create: UserCreateWithoutSubmittedRequestsInput;
    update: UserUpdateWithoutSubmittedRequestsInput;
};
export declare type UserWhereInput = {
    AND?: Maybe<Array<UserWhereInput>>;
    authId?: Maybe<StringFilter>;
    avatar?: Maybe<StringFilter>;
    createdAt?: Maybe<DateTimeFilter>;
    customers?: Maybe<CustomerListRelationFilter>;
    email?: Maybe<StringFilter>;
    firstName?: Maybe<StringNullableFilter>;
    freeRequest?: Maybe<RequestWhereInput>;
    freeRequestId?: Maybe<IntNullableFilter>;
    hasFreeRequest?: Maybe<BoolFilter>;
    hsContactId?: Maybe<BigIntNullableFilter>;
    id?: Maybe<IntFilter>;
    isApproved?: Maybe<BoolFilter>;
    lastName?: Maybe<StringNullableFilter>;
    loginHistory?: Maybe<LoginHistoryListRelationFilter>;
    NOT?: Maybe<Array<UserWhereInput>>;
    onboarding?: Maybe<JsonNullableFilter>;
    optOut?: Maybe<BoolFilter>;
    OR?: Maybe<Array<UserWhereInput>>;
    requestLogs?: Maybe<RequestLogListRelationFilter>;
    requests?: Maybe<RequestListRelationFilter>;
    scripts?: Maybe<ScriptListRelationFilter>;
    slackId?: Maybe<StringNullableFilter>;
    submittedRequests?: Maybe<RequestListRelationFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
};
export declare type UserWhereUniqueInput = {
    authId?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    hsContactId?: Maybe<Scalars['BigInt']>;
    id?: Maybe<Scalars['Int']>;
    slackId?: Maybe<Scalars['String']>;
};
export declare type Video = {
    /** Return the boolean of canRevise */
    canRevise?: Maybe<Scalars['Boolean']>;
    /** Return Vimeo status for a video, and update Video.ready when encoding is done. */
    checkReady?: Maybe<Scalars['Boolean']>;
    createdAt: Scalars['DateTime'];
    customer: Customer;
    /** Return the id of the employee that scripted the video. */
    customerId?: Maybe<Scalars['Int']>;
    customerTenant: Scalars['String'];
    /** Return the download options for a Vimeo video. */
    downloads?: Maybe<Scalars['JSON']>;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    hash?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<Order>;
    orderId?: Maybe<Scalars['Int']>;
    /** Return the id of the employee that scripted the video. */
    producerId?: Maybe<Scalars['Int']>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    request?: Maybe<Request>;
    script?: Maybe<Script>;
    /** Return the id of the employee that scripted the video. */
    scriptId?: Maybe<Scalars['Int']>;
    /** Return the id of the employee that scripted the video. */
    scriptIdAndLayers?: Maybe<Scalars['JSONObject']>;
    /** Return the id of the employee that scripted the video. */
    scriptLayers?: Maybe<Scalars['JSON']>;
    status?: Maybe<VideoStatus>;
    /** Return the thumbnail Vimeo video. */
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt: Scalars['DateTime'];
    vanityButtonText: Scalars['String'];
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutVideosInput;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutVideosInput>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    render?: Maybe<RenderCreateNestedOneWithoutVideoInput>;
    request?: Maybe<RequestCreateNestedOneWithoutVideoInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateNestedManyWithoutCustomerInput = {
    connect?: Maybe<Array<VideoWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<VideoCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<VideoCreateWithoutCustomerInput>>;
};
export declare type VideoCreateNestedManyWithoutOrderInput = {
    connect?: Maybe<Array<VideoWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<VideoCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<VideoCreateWithoutOrderInput>>;
};
export declare type VideoCreateNestedOneWithoutRenderInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutRenderInput>;
    create?: Maybe<VideoCreateWithoutRenderInput>;
};
export declare type VideoCreateNestedOneWithoutRequestInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutRequestInput>;
    create?: Maybe<VideoCreateWithoutRequestInput>;
};
export declare type VideoCreateNestedOneWithoutScriptInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutScriptInput>;
    create?: Maybe<VideoCreateWithoutScriptInput>;
};
export declare type VideoCreateOrConnectWithoutCustomerInput = {
    create: VideoCreateWithoutCustomerInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoCreateOrConnectWithoutOrderInput = {
    create: VideoCreateWithoutOrderInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoCreateOrConnectWithoutRenderInput = {
    create: VideoCreateWithoutRenderInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoCreateOrConnectWithoutRequestInput = {
    create: VideoCreateWithoutRequestInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoCreateOrConnectWithoutScriptInput = {
    create: VideoCreateWithoutScriptInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoCreateWithoutCustomerInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutVideosInput>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    render?: Maybe<RenderCreateNestedOneWithoutVideoInput>;
    request?: Maybe<RequestCreateNestedOneWithoutVideoInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateWithoutOrderInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutVideosInput;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    render?: Maybe<RenderCreateNestedOneWithoutVideoInput>;
    request?: Maybe<RequestCreateNestedOneWithoutVideoInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateWithoutRenderInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutVideosInput;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutVideosInput>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    request?: Maybe<RequestCreateNestedOneWithoutVideoInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateWithoutRequestInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutVideosInput;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutVideosInput>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    render?: Maybe<RenderCreateNestedOneWithoutVideoInput>;
    script?: Maybe<ScriptCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoCreateWithoutScriptInput = {
    createdAt?: Maybe<Scalars['DateTime']>;
    customer: CustomerCreateNestedOneWithoutVideosInput;
    embedJobPage?: Maybe<Scalars['Boolean']>;
    jobUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<OrderCreateNestedOneWithoutVideosInput>;
    publishedAt?: Maybe<Scalars['DateTime']>;
    rating?: Maybe<Scalars['Int']>;
    ready?: Maybe<Scalars['Boolean']>;
    render?: Maybe<RenderCreateNestedOneWithoutVideoInput>;
    request?: Maybe<RequestCreateNestedOneWithoutVideoInput>;
    status?: Maybe<VideoStatus>;
    thumbnail?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    vanityButtonText?: Maybe<Scalars['String']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
export declare type VideoListRelationFilter = {
    every?: Maybe<VideoWhereInput>;
    none?: Maybe<VideoWhereInput>;
    some?: Maybe<VideoWhereInput>;
};
export declare type VideoOrderByInput = {
    createdAt?: Maybe<SortOrder>;
    customer?: Maybe<CustomerOrderByInput>;
    customerTenant?: Maybe<SortOrder>;
    embedJobPage?: Maybe<SortOrder>;
    id?: Maybe<SortOrder>;
    jobUrl?: Maybe<SortOrder>;
    name?: Maybe<SortOrder>;
    order?: Maybe<OrderOrderByInput>;
    orderId?: Maybe<SortOrder>;
    publishedAt?: Maybe<SortOrder>;
    rating?: Maybe<SortOrder>;
    ready?: Maybe<SortOrder>;
    render?: Maybe<RenderOrderByInput>;
    request?: Maybe<RequestOrderByInput>;
    requestId?: Maybe<SortOrder>;
    status?: Maybe<SortOrder>;
    thumbnail?: Maybe<SortOrder>;
    updatedAt?: Maybe<SortOrder>;
    vanityButtonText?: Maybe<SortOrder>;
    vimeoId?: Maybe<SortOrder>;
};
export declare type VideoScalarWhereInput = {
    AND?: Maybe<Array<VideoScalarWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customerTenant?: Maybe<StringFilter>;
    embedJobPage?: Maybe<BoolNullableFilter>;
    id?: Maybe<IntFilter>;
    jobUrl?: Maybe<StringNullableFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<VideoScalarWhereInput>>;
    OR?: Maybe<Array<VideoScalarWhereInput>>;
    orderId?: Maybe<IntNullableFilter>;
    publishedAt?: Maybe<DateTimeNullableFilter>;
    rating?: Maybe<IntNullableFilter>;
    ready?: Maybe<BoolNullableFilter>;
    requestId?: Maybe<IntNullableFilter>;
    status?: Maybe<EnumVideoStatusNullableFilter>;
    thumbnail?: Maybe<StringNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    vanityButtonText?: Maybe<StringFilter>;
    vimeoId?: Maybe<IntNullableFilter>;
};
export declare enum VideoStatus {
    Live = "live",
    Pending = "pending"
}
export declare type VideoUpdateInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutVideosInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutVideosInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    render?: Maybe<RenderUpdateOneWithoutVideoInput>;
    request?: Maybe<RequestUpdateOneWithoutVideoInput>;
    script?: Maybe<ScriptUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateManyMutationInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateManyWithWhereWithoutCustomerInput = {
    data: VideoUpdateManyMutationInput;
    where: VideoScalarWhereInput;
};
export declare type VideoUpdateManyWithWhereWithoutOrderInput = {
    data: VideoUpdateManyMutationInput;
    where: VideoScalarWhereInput;
};
export declare type VideoUpdateManyWithoutCustomerInput = {
    connect?: Maybe<Array<VideoWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<VideoCreateOrConnectWithoutCustomerInput>>;
    create?: Maybe<Array<VideoCreateWithoutCustomerInput>>;
    delete?: Maybe<Array<VideoWhereUniqueInput>>;
    deleteMany?: Maybe<Array<VideoScalarWhereInput>>;
    disconnect?: Maybe<Array<VideoWhereUniqueInput>>;
    set?: Maybe<Array<VideoWhereUniqueInput>>;
    update?: Maybe<Array<VideoUpdateWithWhereUniqueWithoutCustomerInput>>;
    updateMany?: Maybe<Array<VideoUpdateManyWithWhereWithoutCustomerInput>>;
    upsert?: Maybe<Array<VideoUpsertWithWhereUniqueWithoutCustomerInput>>;
};
export declare type VideoUpdateManyWithoutOrderInput = {
    connect?: Maybe<Array<VideoWhereUniqueInput>>;
    connectOrCreate?: Maybe<Array<VideoCreateOrConnectWithoutOrderInput>>;
    create?: Maybe<Array<VideoCreateWithoutOrderInput>>;
    delete?: Maybe<Array<VideoWhereUniqueInput>>;
    deleteMany?: Maybe<Array<VideoScalarWhereInput>>;
    disconnect?: Maybe<Array<VideoWhereUniqueInput>>;
    set?: Maybe<Array<VideoWhereUniqueInput>>;
    update?: Maybe<Array<VideoUpdateWithWhereUniqueWithoutOrderInput>>;
    updateMany?: Maybe<Array<VideoUpdateManyWithWhereWithoutOrderInput>>;
    upsert?: Maybe<Array<VideoUpsertWithWhereUniqueWithoutOrderInput>>;
};
export declare type VideoUpdateOneWithoutRenderInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutRenderInput>;
    create?: Maybe<VideoCreateWithoutRenderInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<VideoUpdateWithoutRenderInput>;
    upsert?: Maybe<VideoUpsertWithoutRenderInput>;
};
export declare type VideoUpdateOneWithoutRequestInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutRequestInput>;
    create?: Maybe<VideoCreateWithoutRequestInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<VideoUpdateWithoutRequestInput>;
    upsert?: Maybe<VideoUpsertWithoutRequestInput>;
};
export declare type VideoUpdateOneWithoutScriptInput = {
    connect?: Maybe<VideoWhereUniqueInput>;
    connectOrCreate?: Maybe<VideoCreateOrConnectWithoutScriptInput>;
    create?: Maybe<VideoCreateWithoutScriptInput>;
    delete?: Maybe<Scalars['Boolean']>;
    disconnect?: Maybe<Scalars['Boolean']>;
    update?: Maybe<VideoUpdateWithoutScriptInput>;
    upsert?: Maybe<VideoUpsertWithoutScriptInput>;
};
export declare type VideoUpdateWithWhereUniqueWithoutCustomerInput = {
    data: VideoUpdateWithoutCustomerInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoUpdateWithWhereUniqueWithoutOrderInput = {
    data: VideoUpdateWithoutOrderInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoUpdateWithoutCustomerInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutVideosInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    render?: Maybe<RenderUpdateOneWithoutVideoInput>;
    request?: Maybe<RequestUpdateOneWithoutVideoInput>;
    script?: Maybe<ScriptUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateWithoutOrderInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutVideosInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    render?: Maybe<RenderUpdateOneWithoutVideoInput>;
    request?: Maybe<RequestUpdateOneWithoutVideoInput>;
    script?: Maybe<ScriptUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateWithoutRenderInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutVideosInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutVideosInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    request?: Maybe<RequestUpdateOneWithoutVideoInput>;
    script?: Maybe<ScriptUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateWithoutRequestInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutVideosInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutVideosInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    render?: Maybe<RenderUpdateOneWithoutVideoInput>;
    script?: Maybe<ScriptUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpdateWithoutScriptInput = {
    createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    customer?: Maybe<CustomerUpdateOneRequiredWithoutVideosInput>;
    embedJobPage?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    jobUrl?: Maybe<NullableStringFieldUpdateOperationsInput>;
    name?: Maybe<NullableStringFieldUpdateOperationsInput>;
    order?: Maybe<OrderUpdateOneWithoutVideosInput>;
    publishedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
    rating?: Maybe<NullableIntFieldUpdateOperationsInput>;
    ready?: Maybe<NullableBoolFieldUpdateOperationsInput>;
    render?: Maybe<RenderUpdateOneWithoutVideoInput>;
    request?: Maybe<RequestUpdateOneWithoutVideoInput>;
    status?: Maybe<NullableEnumVideoStatusFieldUpdateOperationsInput>;
    thumbnail?: Maybe<NullableStringFieldUpdateOperationsInput>;
    updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
    vanityButtonText?: Maybe<StringFieldUpdateOperationsInput>;
    vimeoId?: Maybe<NullableIntFieldUpdateOperationsInput>;
};
export declare type VideoUpsertWithWhereUniqueWithoutCustomerInput = {
    create: VideoCreateWithoutCustomerInput;
    update: VideoUpdateWithoutCustomerInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoUpsertWithWhereUniqueWithoutOrderInput = {
    create: VideoCreateWithoutOrderInput;
    update: VideoUpdateWithoutOrderInput;
    where: VideoWhereUniqueInput;
};
export declare type VideoUpsertWithoutRenderInput = {
    create: VideoCreateWithoutRenderInput;
    update: VideoUpdateWithoutRenderInput;
};
export declare type VideoUpsertWithoutRequestInput = {
    create: VideoCreateWithoutRequestInput;
    update: VideoUpdateWithoutRequestInput;
};
export declare type VideoUpsertWithoutScriptInput = {
    create: VideoCreateWithoutScriptInput;
    update: VideoUpdateWithoutScriptInput;
};
export declare type VideoWhereInput = {
    AND?: Maybe<Array<VideoWhereInput>>;
    createdAt?: Maybe<DateTimeFilter>;
    customer?: Maybe<CustomerWhereInput>;
    customerTenant?: Maybe<StringFilter>;
    embedJobPage?: Maybe<BoolNullableFilter>;
    id?: Maybe<IntFilter>;
    jobUrl?: Maybe<StringNullableFilter>;
    name?: Maybe<StringNullableFilter>;
    NOT?: Maybe<Array<VideoWhereInput>>;
    OR?: Maybe<Array<VideoWhereInput>>;
    order?: Maybe<OrderWhereInput>;
    orderId?: Maybe<IntNullableFilter>;
    publishedAt?: Maybe<DateTimeNullableFilter>;
    rating?: Maybe<IntNullableFilter>;
    ready?: Maybe<BoolNullableFilter>;
    render?: Maybe<RenderWhereInput>;
    request?: Maybe<RequestWhereInput>;
    requestId?: Maybe<IntNullableFilter>;
    script?: Maybe<ScriptWhereInput>;
    status?: Maybe<EnumVideoStatusNullableFilter>;
    thumbnail?: Maybe<StringNullableFilter>;
    updatedAt?: Maybe<DateTimeFilter>;
    vanityButtonText?: Maybe<StringFilter>;
    vimeoId?: Maybe<IntNullableFilter>;
};
export declare type VideoWhereUniqueInput = {
    id?: Maybe<Scalars['Int']>;
    requestId?: Maybe<Scalars['Int']>;
    vimeoId?: Maybe<Scalars['Int']>;
};
