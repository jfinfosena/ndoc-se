import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { itemsInfo, modedev } from "./app/course/page.menu";

export function middleware(request: NextRequest) {
  if (!modedev) {
    const path = request.nextUrl.pathname;
    if (path == "/course") {
      return NextResponse.next();
    }

    let pathMenu: string[] = []
    itemsInfo.forEach((itemInfo) => {
      let dateCurrent = new Date();
      let datePrevious = new Date(itemInfo.date)
      dateCurrent.setHours(0, 0, 0, 0);
      datePrevious.setHours(0, 0, 0, 0);
      if (dateCurrent >= datePrevious) {
        if (itemInfo.submenu.length > 0) {
          itemInfo.submenu.forEach((subitemInfo) => {
            datePrevious = new Date(subitemInfo.date)
            datePrevious.setHours(0, 0, 0, 0);
            if (dateCurrent >= datePrevious) {
              pathMenu.push(subitemInfo.href)
            }
          });
        }
        else {
          pathMenu.push(itemInfo.href)
        }
      }
    });

    if (pathMenu.includes(path)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/course/:path*"],
};
