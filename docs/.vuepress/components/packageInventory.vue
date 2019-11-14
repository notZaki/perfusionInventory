<template>
    <section>
        <b-field grouped group-multiline>
            <!-- Disabled pagination because table is small already.
            <div class="control is-flex">
                <b-switch v-model="isPaginated">Paginated</b-switch>
            </div>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="30">30 / page</option>
                <option value="40">50 / page</option>
            </b-select> 
            -->
            <div v-for="(column, index) in visiblecols"
                 :key="index"
                 class="control">
                <b-checkbox v-model="column.display">
                    {{ column.title }}
                </b-checkbox>
            </div>
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
                <b-table-column 
                label="Modality"
                :visible="visiblecols['category'].display" >
                    <span :class="
                            [
                                'tag',
                                {'is-asl': props.row.category === 'ASL'},
                                {'is-dsc': props.row.category === 'DSC'},
                                {'is-dce': props.row.category === 'DCE'}
                            ]">
                        {{ props.row.category }}
                    </span>
                </b-table-column>

                <b-table-column 
                field="name" 
                label="Name" 
                :visible="visiblecols['name'].display" 
                sortable>
                    <a @click="toggle(props.row)">
                        {{ props.row.name }}
                    </a>
                </b-table-column>

                <b-table-column 
                field="programminglanguage" 
                label="Language" 
                :visible="visiblecols['language'].display" 
                sortable>
                    {{ props.row.programminglanguage ? props.row.programminglanguage : 'Unspecified' }}
                </b-table-column>

                <b-table-column 
                field="hasGUI"
                label="GUI" 
                :visible="visiblecols['GUI'].display"
                sortable>
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

                <b-table-column
                field="hasCLI" 
                label="CLI"
                :visible="visiblecols['CLI'].display"
                sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.hasCLI == false},
                                {'is-success': props.row.hasCLI == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.hasCLI === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column 
                field="isValidated"
                label="Validated"
                :visible="visiblecols['validated'].display"
                sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.isValidated === false},
                                {'is-success': props.row.isValidated === true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.isValidated === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column 
                field="isExtendable"
                label="Extendable"
                :visible="visiblecols['extendable'].display"
                sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.isExtendable == false},
                                {'is-success': props.row.isExtendable == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.isExtendable === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column 
                field="isOpensource"
                label="OpenSource"
                :visible="visiblecols['opensource'].display"
                sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.isOpensource == false},
                                {'is-success': props.row.isOpensource == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.isOpensource === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column 
                label="Link"
                :visible="visiblecols['link'].display">
                    <a :href="props.row.website">
                    <b-icon pack="fas" icon="external-link-alt"></b-icon>
                    </a>
                </b-table-column>

            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <!-- Disabled logo/figure for now. Could be enabled later.
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure> 
                    -->
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.name }} </strong>
                                <br>
                                <small>{{ props.row.developers }}</small>
                                &nbsp; &nbsp;
                                <small>{{ props.row.license ? props.row.license : 'Unknown' }} License</small>
                                <br>
                                <p v-html="props.row.description">
                                {{ props.row.description }}
                                </p>
                                <table style="width:100%">
                                    <tr>
                                        <td><strong>Website</strong></td>
                                        <td><a :href="props.row.website">{{props.row.website}}</a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dependencies</strong></td>
                                        <td>{{ props.row.dependencies }} </td>
                                    </tr>
                                    <tr>
                                        <td><strong>OS</strong></td>
                                        <td>{{ props.row.operatingsystem }} </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Input data</strong></td>
                                        <td>{{ props.row.inputdata ? props.row.inputdata : 'Unknown' }} </td>
                                    </tr>
                                </table>
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
    export default {
        data() {
            return {
                data: [],
                "isPaginated": false,
                "perPage": 20,
                visiblecols: {
                    category: { title: 'Category', display: true },
                    name: { title: 'Name', display: true },
                    language: { title: 'Language', display: true },
                    GUI: { title: 'GUI', display: true },
                    CLI: { title: 'CLI', display: true },
                    validated: { title: 'Validated', display: true },
                    extendable: { title: 'Extendable', display: true },
                    opensource: { title: 'Opensource', display: true },
                    link: { title: 'Link', display: true }
                },
            }
        },
        methods: {
             toggle(row) {
                this.$refs.table.toggleDetails(row)
            }
        },
        mounted () {
            this.axios
            .get('https://raw.githubusercontent.com/notZaki/inventory/master/software.json')
            .then(response => (this.data = response.data))
        }
    }
</script>

<style>
    @import 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css';
    @import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
    
    .tag:not(body).is-dce {
        background-color: #20639b;
        color:white;
    }
    .tag:not(body).is-dsc {
        background-color: #3caea3;
        color:white;
    }
    .tag:not(body).is-asl {
        background-color: #f6d55c;
        color:black;
    }
    img, embed, iframe, object, video {
        height:null;
    }
</style>
