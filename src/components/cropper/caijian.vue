<template>
  <div class="caijian">
    <!-- vueCropper 剪裁图片实现-->
    <div class="vue-cropper-box">
      <div class="vue-cropper-content">
        <vue-cropper ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"></vue-cropper>
      </div>
      <el-button type="danger"
                 @click="onCubeImg">确定裁剪图片</el-button>
      <img src="/static/image/shehuiren.png" alt="" style="width: 100px;">
      <img src="../../assets/logo.png" alt="" style="width: 100px;">
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        // img: '../../assets/logo.png',
        img: '/static/image/shehuiren.png',
        info: true,
        outputSize: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixed: false,
        fixedNumber: [4, 4]
      },
      isShowCropper: true,
      fileinfo: ''
    }
  },
  methods: {
    //上传按钮上传成功执行事件
    handleUploadSuccess (response, file, fileList) {
      this.log('Upload response is %o', response)
      this.fileinfo = response
      this.fileUpload = file
      //上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = file.url
        this.isShowCropper = true
      })
    },
    onCubeImg () {
      this.$refs.cropper.getCropData(data => {
        console.log(data)
        this.fileinfo.url = data
        this.isShowCropper = false
        //先将显示图片地址清空，防止重复显示
        this.option.img = ''
        //将剪裁后base64的图片转化为file格式
        let file = this.convertBase64UrlToBlob(data)
        file.name = this.fileUpload.name
        //将剪裁后的图片执行上传
        this.uploadFile(file).then(res => {
          this.form.content = res.file_id    //将上传的文件id赋值给表单from的content
        })
      })
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  }
}
</script>

<style>
  .caijian{
    height: 100%;
  }
  .vue-cropper-box{
    height: 300px;
  }
  .vue-cropper-content{
    height: 100%;
  }
</style>
