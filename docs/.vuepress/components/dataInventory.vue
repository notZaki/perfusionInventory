<template>
    <section>
        <b-field grouped group-multiline>
            <!-- <div class="control is-flex">
                <b-switch v-model="isPaginated">Paginated</b-switch>
            </div>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="30">30 / page</option>
                <option value="40">50 / page</option>
            </b-select> -->
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
                :visible="visiblecols['modality'].display" >
                    <span :class="
                            [
                                'tag',
                                {'is-asl': props.row.modality === 'ASL'},
                                {'is-dsc': props.row.modality === 'DSC'},
                                {'is-dce': props.row.modality === 'DCE'}
                            ]">
                        {{ props.row.modality }}
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
                field="anatomy" 
                label="Anatomy" 
                :visible="visiblecols['anatomy'].display" 
                sortable>
                    {{ props.row.anatomy ? props.row.anatomy : 'Unspecified' }}
                </b-table-column>

                <b-table-column 
                field="amount" 
                label="Amount" 
                :visible="visiblecols['amount'].display" 
                sortable>
                    {{ props.row.amount }}
                </b-table-column>

                <b-table-column 
                field="size" 
                label="Size" 
                :visible="visiblecols['size'].display" 
                sortable>
                    {{ props.row.size }}
                </b-table-column>

                <b-table-column 
                field="format" 
                label="Format" 
                :visible="visiblecols['format'].display" 
                sortable>
                    {{ props.row.format }}
                </b-table-column>

                <b-table-column 
                field="sequence" 
                label="Sequence" 
                :visible="visiblecols['sequence'].display" 
                sortable>
                    {{ props.row.sequence }}
                </b-table-column>

                <b-table-column 
                field="isPublic"
                label="Public" 
                :visible="visiblecols['public'].display"
                sortable>
                    <span :class="
                            [
                                'tag',
                                {'is-danger': props.row.is_public == false},
                                {'is-success': props.row.is_public == true}
                            ]">
                        <b-icon pack="fas"
                            :icon="props.row.is_public === true ? 'check' : 'times'">
                        </b-icon>
                    </span>
                </b-table-column>

                <b-table-column 
                label="Publication"
                :visible="visiblecols['publication'].display">
                    <a v-if="props.row.publication" :href="props.row.publication">
                    <b-icon pack="fas" icon="external-link-alt"></b-icon>
                    </a>
                </b-table-column>

                <b-table-column 
                label="Link"
                :visible="visiblecols['link'].display">
                    <a v-if="props.row.website" :href="props.row.website">
                    <b-icon pack="fas" icon="external-link-alt"></b-icon>
                    </a>
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
                                <p v-html="props.row.description">
                                {{ props.row.description }}
                                </p>
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
    const data = require('./data/data.json')

    export default {
        data() {
            return {
                data,
                "isPaginated": false,
                "perPage": 20,
                visiblecols: {
                    modality: { title: 'Modality', display: true },
                    name: { title: 'Name', display: true },
                    public: { title: 'Public', display: true },
                    amount: { title: 'Amount', display: true },
                    anatomy: { title: 'Anatomy', display: true },
                    size: { title: 'Size', display: true },
                    format: { title: 'Format', display: true },
                    sequence: { title: 'Sequence', display: true },
                    publication: { title: 'Publication', display: true },
                    link: { title: 'Link', display: true }
                },
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
