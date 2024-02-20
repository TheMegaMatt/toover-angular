import {MenuItem} from "@shared/navigation/models";

export const HeaderMenu: MenuItem[] = [
    { label: 'dashboard.nav', route: ["/"] },
    { label: 'places.nav', route: ["/", 'places'] },
    { label: 'items.nav', route: ["/", 'items'] },
    { label: 'employees.nav', route: ["/", 'employees'] },
    { label: 'types.nav', route: ["/", 'types'] },
]
