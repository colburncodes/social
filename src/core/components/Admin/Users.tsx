
import { Table } from '@mantine/core';
import { useQuery } from "@blitzjs/rpc"
import getUsers from "~/src/features/users/queries/getUsers"

export function Users() {
  const [users] = useQuery(getUsers, {})

  {/* @ts-expect-error Server Component */}
  const rows = users.map((user: any) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>{user.bio ? user.bio : "null"}</Table.Td>
      <Table.Td>{user.onBoarded ? "Yes" : "No"}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>UserId</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Bio</Table.Th>
          <Table.Th>OnBoarded</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}