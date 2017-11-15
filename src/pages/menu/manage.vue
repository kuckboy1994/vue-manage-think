<template>
	<div class="menu-manage">
        <!--<Card style="width:350px">
			<p slot="title">
				<Icon type="ios-film-outline"></Icon>
				Classic film
			</p>
			<a href="#" slot="extra" @click.prevent="changeLimit">
				<Icon type="ios-loop-strong"></Icon>
				Change
			</a>
			<ul>
				<li v-for="(item, index) in menulist" :key="'manage_item_' + index">
					{{item}}
				</li>
			</ul>
		</Card>-->
		<Tree :data="data5" :render="renderContent"></Tree>
	</div>

</template>

<script>
import sortable from 'sortablejs'
import menuApi from '@/api/menu'

export default {
	name: 'menuManage',
	data () {
		return {
			menulist: [{
				children: [],
				menu_name: "介绍",
				pid: 0,
				sort: 0,
				url: '/menu/manage'
			}, {
				children: [{
					menu_name: "vuejs入门",
					pid: 2,
					sort: 0,
					url: '//platedetail/42'
				}],
				menu_name: "介绍",
				pid: 3,
				sort: 1,
				url: '/platelist'
			}],
			data5: [
				{
					title: 'parent 1',
					expand: true,
					render: (h, { root, node, data }) => {
						return h('span', {
							style: {
								display: 'inline-block',
								width: '100%'
							}
						}, [
							h('span', [
								h('Icon', {
									props: {
										type: 'ios-folder-outline'
									},
									style: {
										marginRight: '8px'
									}
								}),
								h('span', data.title)
							]),
							h('span', {
								style: {
									display: 'inline-block',
									float: 'right',
									marginRight: '32px'
								}
							}, [
								h('Button', {
									props: Object.assign({}, this.buttonProps, {
										icon: 'ios-plus-empty',
										type: 'primary'
									}),
									style: {
										width: '52px'
									},
									on: {
										click: () => { this.append(data) }
									}
								})
							])
						]);
					},
					children: [
						{
							title: 'child 1-1',
							expand: true,
							children: [
								{
									title: 'leaf 1-1-1',
									expand: true
								},
								{
									title: 'leaf 1-1-2',
									expand: true
								}
							]
						},
						{
							title: 'child 1-2',
							expand: true,
							children: [
								{
									title: 'leaf 1-2-1',
									expand: true
								},
								{
									title: 'leaf 1-2-1',
									expand: true
								}
							]
						}
					]
				}
			],
			buttonProps: {
				type: 'ghost',
				size: 'small',
			}
		}
	},
	created () {

	},
	mounted () {
		menuApi.getMenuList({
			success: data => {
				console.log(data)
			},
			error: error => {
				console.log(error)
			}
		})
	},
	methods: {
		renderContent (h, { root, node, data }) {
			return h('span', {
				style: {
					display: 'inline-block',
					width: '100%'
				}
			}, [
				h('span', [
					h('Icon', {
						props: {
							type: 'ios-paper-outline'
						},
						style: {
							marginRight: '8px'
						}
					}),
					h('span', data.title)
				]),
				h('span', {
					style: {
						display: 'inline-block',
						float: 'right',
						marginRight: '32px'
					}
				}, [
					h('Button', {
						props: Object.assign({}, this.buttonProps, {
							icon: 'ios-plus-empty'
						}),
						style: {
							marginRight: '8px'
						},
						on: {
							click: () => { this.append(data) }
						}
					}),
					h('Button', {
						props: Object.assign({}, this.buttonProps, {
							icon: 'ios-minus-empty'
						}),
						on: {
							click: () => { this.remove(root, node, data) }
						}
					})
				])
			]);
		},
		append (data) {
			const children = data.children || [];
			children.push({
				title: 'appended node',
				expand: true
			});
			this.$set(data, 'children', children);
		},
		remove (root, node, data) {
			const parentKey = root.find(el => el === node).parent;
			const parent = root.find(el => el.nodeKey === parentKey).node;
			const index = parent.children.indexOf(data);
			parent.children.splice(index, 1);
		}
	}
}
</script>

<style scoped>
.menu-manage {

}

</style>