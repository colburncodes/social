
import { Table } from '@mantine/core';
import { useQuery } from "@blitzjs/rpc"
import getUsers from "~/src/features/users/queries/getUsers"

export function Users() {
  const [users] = useQuery(getUsers, {})
  {/* @ts-expect-error Server Component */}
  const rows = users.map((user: any) => {
    const productSettings = user.settings.map((setting: any) => setting.settingsEmailProduct ? "Yes" : "No").join(", ")
    const marketingSettings = user.settings.map((setting: any) => setting.settingsEmailMarketing ? "Yes" : "No").join(", ")
    return (
      <Table.Tr key={user.id}>
        <Table.Td>{user.id}</Table.Td>
        <Table.Td>{user.name}</Table.Td>
        <Table.Td>{user.username}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{user.role}</Table.Td>
        <Table.Td>{user.bio ? user.bio : "null"}</Table.Td>
        <Table.Td>{user.onBoarded ? "Yes" : "No"}</Table.Td>
        <Table.Td>{productSettings}</Table.Td>
        <Table.Td>{marketingSettings}</Table.Td>
      </Table.Tr>
    )
  });

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders ml={20}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>userId</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th>username</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>role</Table.Th>
          <Table.Th>bio</Table.Th>
          <Table.Th>onboarded</Table.Th>
          <Table.Th>product emails</Table.Th>
          <Table.Th>marketing emails</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}