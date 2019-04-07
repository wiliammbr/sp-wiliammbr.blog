<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.SharePoint.ApplicationPages, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%>
<%@ Page Language="C#" Inherits="Microsoft.SharePoint.ApplicationPages.AccessDeniedPage" MasterPageFile="~/_layouts/15/errorv15.master"       %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="wssuc" TagName="AccessRequestsDialog" src="~/_controltemplates/15/AccessRequestsDialog.ascx" %>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
   <SharePoint:EncodedLiteral runat="server" text="<%$Resources:wss,accessDenied_pagetitle15%>" EncodeMethod='HtmlEncode' Id='LiteralBrowserPageTitle'/>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
   <asp:Literal id="LiteralPageTitle" runat="server"/>
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
   <SharePoint:DelegateControl runat="server" id="CtlAccessDeniedRedirect" ControlId="AccessDeniedRedirect" />
   <meta name="Robots" content="NOINDEX " />
   <meta name="SharePointError" content="1" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   <WebPartPages:AllowFraming runat="server" />
   <div id="ms-accessDenied-reqDialog">
      <wssuc:AccessRequestsDialog Id="AccessRequestsDialog" ShowTitle="True" runat="server"/>
   </div>
   <div id="AccessDeniedAdditionalDetails" runat="server" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderGoBackLink" runat="server">
   <h1>
        <a href="/_layouts/15/closeConnection.aspx?loginasanotheruser=false&amp;ReturnUrl=/">Logout</a>
   </h1>
</asp:Content>
