import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, MenuList } from '@material-tailwind/react';

interface Container {
    marginRight:string;
}

export const Div = styled.div`
    width:100%;
    top:0px;
    position:absolute;
`;

export const DivLogo = styled.div`
    width:100px;
    height:40px;
    display:inline-block;
    left:46%;
    vertical-align:bottom;
    margin-top:20px;
    position:absolute;
`;

export const DivSide = styled.div`
    width:200px;
    height:20px;
    display:inline-block;
    text-align:right;
    vertical-align:bottom;
    margin-top:45px;
    right:30px;
    font-size:12px;
    position:absolute;
`;

export const DivMenu = styled.div`
    width:100%;
    height:40px;
    background-color:rgba(255, 255, 255, 0.7);
    margin-top:65px;
`;

export const DivMenuItem = styled(MenuItem)`
    padding:0px;
`;
    
export const DivMenuInside = styled.div`
    height:40px;
    font-size:14px;
    text-align:center;
    line-height:40px;
    position:relative;
`;

export const DivIcon = styled.div`
    position:absolute;
    width:200px;
    height:40px;
    top:65px;
    font-size:14px;
    right:20px;
`;

export const Logo = styled.img`
`;

export const Icon = styled.img`
    width:23px;
    height:23px;
`;

export const VerticalLine = styled.div<Container>`
    border-left:thin solid rgba(38, 38, 38, 0.7);
    display:inline-block;
    width:1px;
    height:10px;
    margin-right:${(props) => props.marginRight ? props.marginRight : "20px"};
`;

export const NavLinkMenu = styled(NavLink)`
    width:130px;
    height:40px;
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    text-align:center;
    margin-left:20px;
    margin-right:75px;
`;

export const MenuListOut = styled(MenuList)`
    margin-left:500px;
`;
    
export const MenuListDiv = styled.div`
    width:130px;
    height:130px;
    font-size:14px;
    float:left;
    padding-left:0px;
    padding-right:0px;
    margin-left:12px;
    margin-right:0px;
`;

export const NavLinkSide = styled(NavLink)`
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    margin-right:23px;
`;

export const NavLinkIcon = styled(NavLink)`
    text-decoration:none;
    color:rgba(38, 38, 38, 1);
    position:relative;
    text-align:right;
    top:10px;
    margin-right:25px;
    float:left;
`;