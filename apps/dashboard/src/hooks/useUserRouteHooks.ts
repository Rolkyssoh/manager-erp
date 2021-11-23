import { SECTOR_DELEGATE, DELIVERER, SUPER_ADMIN } from '@merp/constants'
import { useEffect, useState } from 'react'
import { IRoute } from '../components'
import { UsersPage, UserDetailsPage } from '../pages'
import { useAuthStore } from '../stores'


export function useUserRouteHooks() {
  const [userRoutes, setUserRoutes] = useState<IRoute[]>([])

  const { user } = useAuthStore()

  const menuRoutes: IRoute[] = [
    {
      path: `${user?.company?.id}/users`,
      label: 'Users page',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [
        SECTOR_DELEGATE,
        SUPER_ADMIN,
        DELIVERER,
      ]
    },
    {
      path: `${user?.company?.id}/users/lksdiowsdl`,
      label: 'John\'s page',
      icon: 'la-id-badge',
      component: UserDetailsPage,
      roles: [
        SECTOR_DELEGATE,
      ]

    },
    {
      path: 'other',
      label: 'Another other page',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [
        SECTOR_DELEGATE,
        SUPER_ADMIN
      ]

    },
    {
      path: 'different',
      label: 'Different page',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [
        SECTOR_DELEGATE,
        SUPER_ADMIN
      ]

    },
    {
      path: 'page',
      label: 'Page',
      icon: 'la-id-badge',
      component: UsersPage,
      roles: [
        SECTOR_DELEGATE,
        SUPER_ADMIN
      ]
    },
  ]

  useEffect(() => {
    if (!user) {
      setUserRoutes([])
      return;
    }
    const filteredRoutes = menuRoutes.filter(route => {
      return route.roles.includes(user.role.id)
    })
    setUserRoutes(filteredRoutes)
  }, [user])

  return userRoutes

}
