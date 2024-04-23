/**
 * 用户个人信息
 */
export type userType = {
    id : number;
    username : string;
    userAccount : string;
    avatarUrl : string;
    profile?: string;
    gender : number;
    phone : string;
    email : string;
    userStatus : string;
    userRole : string;
    planetCode : string;
    tags : string[];
    createTime : Date;
};