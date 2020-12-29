<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
    >
      <!-- 2.v-model绑定user -->
      <el-form :model="user">
        <div>user:{{ user }}</div>

        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeImg"
            />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in showSpecsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { reqgoodsAdd, reqCateList, reqSpecsList } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      // 1.初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类的列表
      secondCateList: [],
      // 规格属性展示的所有选项的列表
      showSpecsAttr: [],
      //定义图片的路径
      imgUrl: "",
    };
  },
  computed: {
    //以及分类列表的list
    ...mapGetters({
      cateList: "cate/list",
      //商品规格的列表list
      specsList: "specs/list",
    }),
  },
  methods: {
    // 一级分类列表的获取
    ...mapActions({
      reqCateList: "cate/reqList",
      //商品规格的列表获取
      reqSpecsList: "specs/reqList",
      //列表刷新
      reqList: "goods/reqList",
    }),
    // 根据一级分类的id计算出二级分类
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //当修改了一级分类的时候，二级分类的数据随之要改表
    changeFirstCateId() {
      //先清空之前的二级分类
      this.user.second_cateid = "";
      //在请求新的二级分类
      this.getSecondList();
    },

    //获取规格属性的展示列表  attrs
    getShowSpecsAttr() {
      //选中的规格是user.specsid，要从specsList(规格数据中)其中选出id和user.specsid一样的那一条数据的attrs
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.showSpecsAttr = obj ? obj.attrs : [];
    },
    //当修改了商品规格的时候，规格属性的数据随之要改表
    changeSpecsId() {
      //将之前的规格属性清空
      this.user.specsattr = [];

      //计算出规格属性展示的所有选项的列表
      this.getShowSpecsAttr();
    },
    //图片上传
    changeImg(e) {
      let file = e.target.files[0];
      //判断 略
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //数据清空
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      //二级分类的列表
      this.secondCateList = [];
      // 规格属性展示的所有选项的列表
      this.showSpecsAttr = [];
    },
    //点击添加
    add() {
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };
      reqgoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
        }
      });
    },
    //点击取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    getOne(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //重新获取二级分类的list
          this.getSecondList();
          //图片
          this.imgUrl = this.$pre + this.user.img;
          //规格属性展示list
          this.getShowSpecsAttr();
          //规格属性选中的list
          this.user.specsattr = JSON.parse(this.user.specsattr);
          //补id
          this.user.id = id;
        }
      });
    },
    update() {
      reqgoodsUpdate(data).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
        }
      });
    },
  },
  mounted() {
    //如果没有请过分类数据，就发一下请求
    if (this.cateList.length === 0) {
      this.reqCateList();
    }

    //7请求规格list
    this.reqSpecsList();
  },
};
</script>

<style scoped>
/* 原生js的样式 */
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>