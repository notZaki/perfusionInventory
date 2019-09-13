<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control is-flex">
                <b-switch v-model="isPaginated">Paginated</b-switch>
            </div>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="30">30 / page</option>
                <option value="40">50 / page</option>
            </b-select>
        </b-field>
        <div class="container is-flex">
        <b-table
            :data="data"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-position="paginationPosition"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            default-sort="user.first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" sortable numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="user.first_name" label="First Name" sortable>
                    {{ props.row.user.first_name }}
                </b-table-column>

                <b-table-column field="user.last_name" label="Last Name" sortable>
                    {{ props.row.user.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
                    <span class="tag is-info">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <span>
                        <b-icon pack="fas"
                            :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                        </b-icon>
                        {{ props.row.gender }}
                    </span>
                </b-table-column>

            </template>
        </b-table>
        </div>
    </section>
</template>

<script>
    const data = require('./data/sample.json')

    export default {
        data() {
            return {
                data,
                isPaginated: true,
                paginationPosition: 'bottom',
                sortIcon: 'chevron-up',
                sortIconSize: 'is-small',
                currentPage: 1,
                perPage: 10
            }
        }
    }
</script>

<style>
    @import 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css';
    @import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
</style>