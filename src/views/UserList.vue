<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Search by name or email"
      outlined
      clearable
      class="mb-4"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :loading="loading"
      hide-default-footer
      @click:row="handleRowClick"
    >
      <template v-slot:loading>
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

const users = ref<User[]>([]);
const loading = ref(true);
const searchQuery = ref("");

const router = useRouter();

const headers = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Phone", key: "phone" },
  { title: "Company Name", key: "company.name" },
];

const fetchUsers = async () => {
  try {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

const filteredUsers = computed(() => {
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleRowClick = (event: Event, { item }: { item: User }) => {
  router.push({ name: "UserDetail", params: { id: item.id } });
};

onMounted(() => {
  fetchUsers();
});
</script>
