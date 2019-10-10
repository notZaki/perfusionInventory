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
            ref="table"
            :paginated="isPaginated"
            :per-page="perPage"
            detailed
            :show-detail-icon=false
            default-sort="name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <template slot-scope="props">
                <b-table-column field="name" label="First Name" sortable>
                    <a @click="toggle(props.row)">
                        {{ props.row.name }}
                    </a>
                </b-table-column>

                <b-table-column field="programminglanguage" label="Language" sortable>
                    {{ props.row.programminglanguage ? props.row.programminglanguage : 'Unspecified' }}
                </b-table-column>

                <b-table-column label="GUI" sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.hasGUI == false},
                                {'is-success': props.row.hasGUI == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.hasGUI === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column label="CLI">
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.supportsbatch == false},
                                {'is-success': props.row.supportsbatch == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.supportsbatch === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column label="Validated">
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.validated == false},
                                {'is-success': props.row.validated == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.validated === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column label="Extendable">
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.extendable == false},
                                {'is-success': props.row.extendable == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.extendable === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column label="OpenSource">
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.opensource == false},
                                {'is-success': props.row.opensource == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.opensource === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <!-- <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure> -->
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.name }} </strong>
                                <br>
                                <small>{{ props.row.developers }}</small>
                                &nbsp; &nbsp;
                                <small>{{ props.row.license ? props.row.license : 'Unknown' }} License</small>
                                <br>
                                {{ props.row.description }}
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
        </div>
    </section>
</template>

<script>
    const data = require('./data/software.json')

    export default {
        data() {
            return {
                data,
                "isPaginated": true,
                "perPage": 20
            }
        },
        methods: {
            toggle(row) {
                this.$refs.table.toggleDetails(row)
            }
        }
    }
</script>

<style>
    @import 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css';
    @import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
</style>