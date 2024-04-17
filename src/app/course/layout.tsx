'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import {
    BarsOutlined,
    MenuOutlined,
    FileOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { MenuProps, Image } from 'antd';
import { Anchor, Button, Drawer, Flex, Layout, Menu, Typography, theme } from 'antd';
import { usePathname } from 'next/navigation';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { infoCourse, itemsInfo, modedev } from './page.menu';

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    padding: '10px'
};

type typeLink = {
    key: number,
    href: string,
    title: string,
    order: number
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //Header ----------------------------------------------------------------------------------------------------------------

    const handleCollapsed = () => {
        setcollapsed(!collapsed)
    }

    
    const path = usePathname()
    //Sider left ------------------------------------------------------------------------------------------------
    const [breakpoint, setBreakpoint] = useState(false)
    const [collapsed, setcollapsed] = useState(true)

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const items: MenuProps['items'] = []

    let indexItem = 0
    itemsInfo.forEach((itemInfo) => {
        if (!modedev) {
            let dateCurrent = new Date();
            let datePrevious = new Date(itemInfo.date)
            dateCurrent.setHours(0, 0, 0, 0);
            datePrevious.setHours(0, 0, 0, 0);
            if (dateCurrent >= datePrevious) {
                if (itemInfo.submenu.length > 0) {
                    const subitems: ItemType[] = []
                    itemInfo.submenu.forEach((subitemInfo) => {
                        datePrevious = new Date(subitemInfo.date)
                        datePrevious.setHours(0, 0, 0, 0);
                        if (dateCurrent >= datePrevious) {
                            subitems.push(getItem(<Link href={subitemInfo.href} onClick={handleCollapsed}>{subitemInfo.label}</Link>, indexItem.toString()))
                            indexItem++
                        }
                    });
                    items.push(getItem(itemInfo.label, indexItem.toString(), <FileOutlined />, subitems))
                    indexItem++
                }
                else {
                    items.push(
                        getItem(<Link href={itemInfo.href} onClick={handleCollapsed}>{itemInfo.label}</Link>, indexItem.toString(), <FileOutlined />)
                    )
                    indexItem++
                }
            }
        }
        else {
            if (itemInfo.submenu.length > 0) {
                const subitems: ItemType[] = []
                itemInfo.submenu.forEach((subitemInfo) => {
                    subitems.push(getItem(<Link href={subitemInfo.href} onClick={handleCollapsed}>{subitemInfo.label}</Link>, indexItem.toString()))
                    indexItem++
                });
                items.push(getItem(itemInfo.label, indexItem.toString(), <FileOutlined />, subitems))
                indexItem++
            }
            else {
                items.push(
                    getItem(<Link href={itemInfo.href} onClick={handleCollapsed}>{itemInfo.label}</Link>, indexItem.toString(), <FileOutlined />)
                )
                indexItem++
            }
        }

    });

    //Sider right ------------------------------------------------------------------------------------------------------
    const [heraders, setHeraders] = useState<typeLink[]>([]);

    useEffect(() => {
        setTimeout(() => {
            const headers = Array.from(
                document.querySelectorAll("h1, h2, h3, h4, h5, h6")
            );
            const newLinks = headers.map((header, index) => ({
                key: index,
                href: `#header${index}`,
                title: (header as HTMLElement).innerText,
                order: parseInt(header.tagName[1]),
            }));
            let finalData: { children: typeLink[]; key: number; href: string; title: string; order: number; }[] = []
            let countHeaders = -1;
            newLinks.forEach(element => {
                try {
                    if (element.order == 1) {
                        countHeaders++
                        finalData.push({
                            ...element,
                            children: []
                        })
                    }
                    else {
                        if (element.order == 2) {
                            finalData[countHeaders].children.push(element)
                        }
                    }
                } catch (error) {

                }
            });
            headers.forEach((header, index) => {
                (header as HTMLElement).id = `header${index}`;
            });
            setHeraders(finalData);
        }, 500);
    }, [path]);

    const handleClick = (
        e: React.MouseEvent<HTMLElement>,
        link: {
            title: React.ReactNode;
            href: string;
        },
    ) => {
        onClose()
        e.preventDefault();        
    };

    //Drawer ---------------------------------------------------------------------------------------------------------------
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Layout hasSider style={{ backgroundColor: 'white' }}>
                <Sider
                    theme='dark'
                    width={250}
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsed={breakpoint ? collapsed : false}
                    onBreakpoint={(broken) => {
                        setBreakpoint(broken)
                    }}                   
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 5000 }}
                >
                    <Flex justify='space-between' align='center' >
                        <Flex gap="small" wrap="wrap" align='center' justify='flex-start' style={{ margin: 10 }}>
                            <Image preview={false} height={32} src="/logo.png"  ></Image>
                            <Text strong type="success" style={{ fontSize: '1.5em', marginLeft: 'md' }}>JDOCode</Text>
                        </Flex>
                        {breakpoint ? (
                            <Button type="link" style={{ marginRight: 10 }} icon={<CloseOutlined />} size={'middle'} onClick={() => {
                                setcollapsed(true)
                            }} />
                        ) : (<></>)}
                    </Flex>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
                </Sider>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    theme='light'
                    width={250}
                    onBreakpoint={(broken) => {
                        setBreakpoint(broken)
                    }}                   
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0, top: 0, bottom: 0 }}
                >
                    <h3 style={{ margin: 10 }}>Tabla de Contenido</h3>
                    <Anchor
                        style={{ margin: 10 }}
                        affix={false}
                        onClick={handleClick}
                        items={heraders}
                        offsetTop={80}
                    />
                </Sider>
                <Layout style={{ marginLeft: breakpoint ? 0 : 250, marginRight: breakpoint ? 0 : 250, padding: 0 }}>
                    <Header style={{ paddingLeft: 0, paddingRight: 0, margin: 0, background: colorBgContainer, position: 'sticky', top: 0, zIndex: 100 }} >
                        <Flex style={boxStyle} justify='space-between' align='center' >
                            {breakpoint ? (
                                <Button type="link" icon={<MenuOutlined />} size={'middle'} onClick={() => {
                                    handleCollapsed()
                                    setOpen(false)
                                }} />
                            ) : (<></>)}
                            <Flex style={boxStyle} justify='center' align='center' >
                                <Text type="success" strong style={{ maxWidth: '80%', fontSize: '1.5em' }} ellipsis>
                                    {infoCourse.title.toUpperCase()}
                                </Text>
                            </Flex>
                            {breakpoint ? (
                                <Button type="link" icon={<BarsOutlined />} size={'middle'} onClick={() => {
                                    showDrawer()
                                    setcollapsed(true)
                                }} />
                            ) : (<> </>)} 
                        </Flex>                       
                    </Header>                   
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial', padding: '10px' }}>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©{new Date().getFullYear()} Created by JFVG
                    </Footer>
                </Layout>
            </Layout>

            <Drawer
                placement='right'
                closable={false}
                onClose={onClose}
                open={open}
                width={300}
            >
                <h3 style={{ margin: 10 }}>Tabla de Contenido</h3>
                <Anchor
                    style={{ margin: 10 }}
                    affix={false}
                    onClick={handleClick}
                    items={heraders}
                    offsetTop={80}
                />
            </Drawer>
        </>
    );
};


