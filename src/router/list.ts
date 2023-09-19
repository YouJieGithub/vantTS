declare module "vue-router" {
    interface RouteMeta {
        //标题
        title: string;
        // 是可选的
        isAdmin?: any;

        //可选参数
        [name: string]: any;
    }
}
export const routes: any = [
    {
        path: "/login",
        name: "login",
        meta: {title: "登录"},
        component: () => import("@/view/login/login.vue"),
    },
    {
        path: "/home",
        name: "home",
        meta: {title: "首页"},
        component: () => import("@/view/home/home.vue"),
    },
    {
        path: "/register",
        name: "register",
        meta: {title: "注册"},
        component: () => import("@/view/register/register.vue"),
    },
    {
        path: "/registerNotice",
        name: "registerNotice",
        meta: {title: "入职协议列表"},
        component: () => import("@/view/register/registernotice.vue"),
    },
    {
        path: "/regnotdetail",
        name: "regnotdetail",
        meta: {title: "入职协议详情"},
        component: () => import("@/view/register/regnotdetail.vue"),
    },
    {
        path: "/registerSuccess",
        name: "registerSuccess",
        meta: {title: "注册成功"},
        component: () => import("@/view/register/registersuccess.vue"),
    },
    {
        path: "/salary",
        name: "salary",
        meta: {title: "银行卡"},
        component: () => import("@/view/salary/salarycard.vue")
    },
    {
        path: "/addsalary",
        name: "addsalary",
        meta: {title: "修改银行卡"},
        component: () => import("@/view/salary/addsalarycard.vue"),
    },
    {
        path: "/personnel",
        name: "personnel",
        meta: {title: "人员管理"},
        component: () => import("@/view/personnel/personnel.vue"),
    },
    {
        path: "/personnelanalyze",
        name: "personnelanalyze",
        meta: {title: "人员分析"},
        component: () => import("@/view/personnel/analyze.vue"),
    },
    {
        path: "/singledetail",
        name: "singledetail",
        meta: {title: "单量分析"},
        component: () => import("@/view/single/singledetail.vue"),
    },
    {
        path: "/singleanalyze",
        name: "singleanalyze",
        meta: {title: "单量详情"},
        component: () => import("@/view/single/singleanalyze.vue"),
    },
    {
        path: "/personalinfo",
        name: "personalinfo",
        meta: {title: "个人信息"},
        component: () => import("@/view/personal/personalinfo.vue"),
    },
    {
        path: "/base",
        name: "base",
        meta: {title: "基础信息"},
        component: () => import("@/view/personal/base.vue"),
    },
    {
        path: "/revisepassword",
        name: "revisepassword",
        meta: {title: "修改密码"},
        component: () => import("@/view/personal/revisepassword.vue"),
    },
    {
        path: "/noticelist",
        name: "noticelist",
        meta: {title: "通知"},
        component: () => import("@/view/notice/noticelist.vue"),
    },
    {
        path: "/noticedetail",
        name: "noticedetail",
        meta: {title: "通知详情"},
        component: () => import("@/view/notice/noticedetail.vue"),
    },
    {
        path: "/submitfeedback",
        name: "submitfeedback",
        meta: {title: "提交意见反馈"},
        component: () => import("@/view/feedback/submitfeedback.vue"),
    },
    {
        path: "/feedbacklist",
        name: "feedbacklist",
        meta: {title: "反馈记录"},
        component: () => import("@/view/feedback/feedbacklist.vue"),
    },
    {
        path: "/resign",
        name: "resign",
        meta: {title: "离职通道"},
        component: () => import("@/view/resign/resign.vue"),
    },
    {
        path: "/resignlist",
        name: "resignlist",
        meta: {title: "离职申请记录"},
        component: () => import("@/view/resign/resignlist.vue"),
    },
    {
        path: "/Insurance",
        name: "Insurance",
        meta: {title: "店小二"},
        component: () => import("@/view/Insurance/Insurance.vue")
    },
    {
        path: "/ClaimsList",
        name: "ClaimsList",
        meta: {title: "报案理赔"},
        component: () => import("@/view/InsuranceClaims/ClaimsList.vue"),
    },
    {
        path: "/newClaims",
        name: "newClaims",
        meta: {title: "新增理赔"},
        component: () => import("@/view/InsuranceClaims/newClaims.vue"),
    },
    {
        path: "/claimsDetails",
        name: "claimsDetails",
        meta: {title: "理赔详情"},
        component: () => import("@/view/InsuranceClaims/claimsDetails.vue"),
    },
    {
        path: "/material",
        name: "material",
        meta: {title: "物料"},
        component: () => import("@/view/material/materialList.vue"),
    },
    {
        path: "/recharget",
        name: "recharget",
        meta: {title: "PAY"},
        component: () => import("@/view/PAY/recharget.vue"),
    },
    {
        path: "/payment",
        name: "payment",
        meta: {title: "立即支付"},
        component: () => import("@/view/PAY/payment.vue"),
    },
    {
        path: "/records",
        name: "records",
        meta: {title: "申请记录"},
        component: () => import("@/view/PAY/records.vue"),
    },
    {
        path: "/applyRorRefund",
        name: "applyRorRefund",
        meta: {title: "申请退款"},
        component: () => import("@/view/PAY/applyForRefund.vue"),
    },
    {
        path: "/PAYdetail",
        name: "PAYdetail",
        meta: {title: "申请详情"},
        component: () => import("@/view/PAY/PAYdetail.vue"),
    }
];
