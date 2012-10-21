class RandomStringGenerator

	WHITELIST = ('a'..'z').to_a + (0..9).to_a

	@@rand = Random.new

	def self.generate_string(length = 32)
		new_string = ""
		length.times do
			index = @@rand.rand(WHITELIST.length)
			new_string << WHITELIST[index].to_s
		end
		new_string
	end

end