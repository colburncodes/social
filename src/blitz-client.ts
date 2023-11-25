import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc"
import { notifications } from "@mantine/notifications"

export const authConfig = {
  cookiePrefix: "social",
}

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      // optional
      reactQueryOptions: {
        queries: {
          retry: 2,
        },
        // the magical lines:
        mutations: {
          // N.B. this will be overridden in case you
          // define onSuccess() inside your `useMutation` options
          onSuccess: async () => {
            const queryClient = getQueryClient()
            await queryClient.invalidateQueries()
          },
          onError: async (error: any) => {
            notifications.show({
              color: 'red',
              title: 'Error',
              message: error.message
            })
          }
        },
      },
    }),
  ],
})
